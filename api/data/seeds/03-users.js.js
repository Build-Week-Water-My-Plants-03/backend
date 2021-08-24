
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: "dave", password: "123", phone_number: "5555555555" },
        { username: "jim", password: "123", phone_number: "5555555555" },
        { username: "bones", password: "123", phone_number: "5555555555" }
      ]);
    });
};
