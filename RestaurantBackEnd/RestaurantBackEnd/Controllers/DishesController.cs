using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using RestaurantBackEnd.Models;

namespace RestaurantBackEnd.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DishesController : ApiController
    {
        private RestaurantBackEndContext db = new RestaurantBackEndContext();

        // GET: api/Dishes
        public IQueryable GetDishes()
        {
            return db.Dishes.Select(dish =>
            new
            {
                dish.Id,
                dish.Name,
                dish.Price,
                Restaurant = new
                {
                    dish.Restaurant.Id,
                    dish.Restaurant.Name
                }
            }
            );
        }

        // GET: api/Dishes/5
        public IHttpActionResult GetDish(int id)
        {
            var dish = db.Dishes.Where(x => x.Id == id).Select(d => 
                new
                {
                    d.Id,
                    d.Name,
                    d.Price,
                    Restaurant = new
                    {
                        d.Restaurant.Id,
                        d.Restaurant.Name
                    }
                }).First();

            if (dish == null)
            {
                return NotFound();
            }

            return Ok(dish);
        }

        // PUT: api/Dishes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDish(int id, Dish dish)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != dish.Id)
            {
                return BadRequest();
            }

            var dbDish = db.Dishes
                .Include(x => x.Restaurant)
                .Single(x=> x.Id == dish.Id);

            db.Entry(dbDish).CurrentValues.SetValues(dish);
            dbDish.Restaurant = db.Restaurants.Find(dish.Restaurant.Id);
          
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DishExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Dishes
        [ResponseType(typeof(Dish))]
        public IHttpActionResult PostDish(Dish dish)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            dish.Restaurant = db.Restaurants.Find(dish.Restaurant.Id);

            db.Dishes.Add(dish);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = dish.Id }, dish);
        }

        // DELETE: api/Dishes/5
        [ResponseType(typeof(Dish))]
        public IHttpActionResult DeleteDish(int id)
        {
            Dish dish = db.Dishes.Find(id);
            if (dish == null)
            {
                return NotFound();
            }

            db.Dishes.Remove(dish);
            db.SaveChanges();

            return Ok(dish);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DishExists(int id)
        {
            return db.Dishes.Count(e => e.Id == id) > 0;
        }
    }
}