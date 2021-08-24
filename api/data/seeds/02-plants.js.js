exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {
          nickname: "Beth",
          species: "Daisies",
          h2o_frequency: "1 inch per week",
          image: "https://www.gardeningknowhow.com/wp-content/uploads/2020/06/daisies.jpg",
        },
        {
          nickname: "Birdie",
          species: "Birds of Paradise",
          h2o_frequency: "Every 2 weeks",
          image: "https://www.gardeningknowhow.com/wp-content/uploads/2020/11/bird-of-paradise-flower.jpg",
        },
        {
          nickname: "Bamboo",
          species: "Bamboo",
          h2o_frequency: "Twice a week",
          image: "https://www.gardeningknowhow.com/wp-content/uploads/2009/07/control-bamboo.jpg",
        }
      ]);
    });
};
