using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RestaurantBackEnd.Models;
using Moq;
using System.Data.Entity;
using System.Collections.Generic;
using System.Linq;
using RestaurantBackEnd.Controllers;
using System.Web.Http.Results;
using System.Data.Entity.Infrastructure;
using System.Xml.Linq;
using System.Web.Http;

namespace RestaurantBackEnd.Tests
{
    [TestClass]
    public class BackEndUT
    {

        RestaurantsController restaurantController;
        DishesController dishController;
        IQueryable<Restaurant> data;

        private void SetupData()
        {
            data = new List<Restaurant>
            {
                new Restaurant()
                {
                    Id = 1,
                    Name = "Restaurante 1",

                },
                new Restaurant()
                {
                    Id = 2,
                    Name = "Restaurante 2",

                }
            }.AsQueryable();

            var mockSet = new Mock<DbSet<Restaurant>>();
            mockSet.As<IQueryable<Restaurant>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<Restaurant>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<Restaurant>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<Restaurant>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());
            mockSet.Setup(c => c.Find(It.IsAny<object[]>())).Returns((object[] id) => data.Where(r => r.Id == (int)id[0]).FirstOrDefault());


     

            var mockContext = new Mock<IRestaurantBackEndContext>();
            mockContext.Setup(c => c.Restaurants).Returns(mockSet.Object);
            mockContext.Setup(c => c.MarkAsChanged(It.IsAny<Restaurant>())).Callback<Restaurant>((restaurant) =>
            {
                var existingRestaurant = data.Where(r => r.Id == restaurant.Id).FirstOrDefault();
                existingRestaurant.Name = restaurant.Name;
            });
            
            

            restaurantController = new RestaurantsController(mockContext.Object);
            dishController = new DishesController(mockContext.Object);
        }

        [TestMethod]
        public void GetAllRestaurants_ReturnedQuantityIsCorrect()
        {
            // Arrange
            SetupData();

            // Act
            var restaurants = (DbSet<Restaurant>)restaurantController.GetRestaurants();

            // Assert
            Assert.AreEqual(2, restaurants.ToArray().Count());

        }

        [TestMethod]
        public void AddNewRestaurant_RestaurantIsCreated()
        {
            // Arrange
            SetupData();

            var restaurant = new Restaurant
            {
                Id = 3,
                Name = "Restaurante 3 "
            };

            // Act
            CreatedAtRouteNegotiatedContentResult<Restaurant> result = (CreatedAtRouteNegotiatedContentResult<Restaurant>) restaurantController.PostRestaurant(restaurant);

            // Assert
            Assert.AreEqual(restaurant.Id, result.Content.Id);
            Assert.AreEqual(restaurant.Name, result.Content.Name);


        }

        [TestMethod]
        public void ModifyRestaurant_RestaurantIsChanged()
        {
            // Arrange
            SetupData();

            var restaurant = new Restaurant
            {
                Id = 1,
                Name = "Novo Nome"
            };


            // Act
            restaurantController.PutRestaurant(restaurant.Id, restaurant);
            var changedRestaurant = data.Where(x => x.Id == restaurant.Id).FirstOrDefault();


            // Assert
            Assert.AreEqual(restaurant.Name, changedRestaurant.Name);

        }
    }
}
