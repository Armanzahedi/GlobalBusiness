using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GlobalBusiness.Core.Entities;
using GlobalBusiness.DataAccess.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace GlobalBusiness.DataAccess.Repositories
{
    public interface IBaseRepository<T> where T : class, IBaseEntity
    {
        Task<List<T>> GetAll();
        Task<int> GetCount();
        Task<List<T>> GetListPaged(int pageNumber, int itemsPerPage);
        Task<T> GetById(int id);
        Task<T> Add(T entity);
        Task<T> Update(T entity);
        Task<T> AddOrUpdate(T entity);
        Task<T> Delete(int id);
        Task<T> Delete(T entity);
        Task<T> Remove(int id);
        IEnumerable<T> GetDefaultQuery();
    }
    public class BaseRepository<T> : IBaseRepository<T>
        where T : class, IBaseEntity
    {
        private readonly MyDbContext _context;
        private readonly HttpContextAccessor _httpContext;
        public BaseRepository(MyDbContext context)
        {
            _context = context;
            _httpContext ??= new HttpContextAccessor();
        }
        public async Task<List<T>> GetAll()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<int> GetCount()
        {
            return await _context.Set<T>().CountAsync();
        }

        public async Task<List<T>> GetListPaged(int pageNumber = 1, int itemsPerPage = 10)
        {
            var entity = await _context.Set<T>().Skip((pageNumber - 1) * itemsPerPage).Where(e => e.IsDeleted == false)
                .Take(itemsPerPage).ToListAsync();

            return entity;

        }

        public async Task<T> GetById(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<T> Add(T entity)
        {
            entity.InsertDate = DateTime.Now;
            entity.InsertUser = GetCurrentUsersName();
            _context.Set<T>().Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        public async Task<T> Update(T entity)
        {
            var oldEntity = _context.Set<T>().Find(entity.Id);
            entity.InsertDate = oldEntity.InsertDate;
            entity.InsertUser = oldEntity.InsertUser;

            Detach(oldEntity);

            entity.UpdateDate = DateTime.Now;
            entity.UpdateUser = GetCurrentUsersName();

            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }
        public async Task<T> AddOrUpdate(T entity)
        {
            var a = await _context.Set<T>().FindAsync(entity.Id);

            if (a != null)
            {
                return await Update(entity);
            }
            else
            {
                return await Add(entity);
            }
        }
        public async Task<T> Delete(int id)
        {
            var entity = _context.Set<T>().Find(id);
            entity.IsDeleted = true;
            return await Update(entity);
        }
        public async Task<T> Delete(T entity)
        {
            entity.IsDeleted = true;
            return await Update(entity);
        }
        public async Task<T> Remove(int id)
        {
            var entity = _context.Set<T>().Find(id);

            if (entity != null)
            {
                _context.Set<T>().Remove(entity);
                await _context.SaveChangesAsync();
            }

            return entity;
        }

        public IEnumerable<T> GetDefaultQuery()
        {
            return _context.Set<T>().Where(m => m.IsDeleted == false).AsQueryable();
        }

        #region Private Methods
        private void Detach(T entity)
        {
            _context.Entry(entity).State = EntityState.Detached;
            _context.SaveChanges();
        }

        private string GetCurrentUsersName()
        {
            var userName = "";
            if (_httpContext?.HttpContext?.User?.Identity?.Name != null)
            {
                userName = _httpContext.HttpContext.User.Identity.Name;
            }
            return userName;
        }

        #endregion
    }

}
