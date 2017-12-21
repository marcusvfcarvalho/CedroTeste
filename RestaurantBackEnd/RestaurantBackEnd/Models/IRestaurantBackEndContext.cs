using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;

namespace RestaurantBackEnd.Models
{
    public interface IRestaurantBackEndContext: IDisposable
    {
        DbSet<Restaurant> Restaurants { get; set; }
        int SaveChanges();
        void MarkAsChanged(Restaurant restaurant);

    }
}