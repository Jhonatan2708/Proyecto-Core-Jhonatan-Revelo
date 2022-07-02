using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantAPI.Models
{
    public class RestaurantDbContext:DbContext
    {
        //Se procede a crear la base de datos fisicamente
        //Mediante la Migracion
        public RestaurantDbContext(DbContextOptions<RestaurantDbContext> options):base(options)
        {

        } 
        //Se establece esta propiedad para todos nuestros Models
        public DbSet<Customer> Customers { get; set; }
        public DbSet<FoodItem> FoodItems { get; set; }
        public DbSet<OrderMaster> OrderMasters { get; set; } 
        public DbSet<OrderDetail> OrderDetails { get; set; }
    }
}
