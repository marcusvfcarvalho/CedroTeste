using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace RestaurantBackEnd.Models
{
    public class RestaurantBackEndContext : DbContext, IRestaurantBackEndContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public RestaurantBackEndContext() : base("name=RestaurantBackEndContext")
        {
        }

        public virtual System.Data.Entity.DbSet<RestaurantBackEnd.Models.Restaurant> Restaurants { get; set; }

       public void MarkAsChanged(Restaurant restaurant)
        {
            Entry(restaurant).State = EntityState.Modified;
        }

        public System.Data.Entity.DbSet<RestaurantBackEnd.Models.Dish> Dishes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Dish>()
                .HasRequired(d => d.Restaurant)
                .WithMany()
                .WillCascadeOnDelete(true);
        }

    }
}
