using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantBackEnd.Models
{
    public class Dish
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public Restaurant Restaurant { get; set; }
    }
}