require('dotenv').config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require('sequelize');
const exportsObj = require('./controller');

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const seed = (req, res) => {
  sequelize
    .query(
      `DROP TABLE if EXISTS task_table;
      DROP TABLE if EXISTS placeholder_text;

      CREATE TABLE task_table (
              task_id   SERIAL PRIMARY KEY,
              task VARCHAR,
              completed BOOLEAN
          );

            INSERT INTO task_table (task, completed)
            VALUES ('Demo Task:     Type task into text box', FALSE),
            ('Demo Task:      Click add button to add task to list', FALSE),
            ('Demo task:      Click on task text to cross off task as completed',  FALSE),
            ('Demo Task:   Click on X button to delete tasks', FALSE);
            
        CREATE TABLE placeholder_text (
            placeholder_id SERIAL PRIMARY KEY,
            text VARCHAR
        );
        
        INSERT INTO placeholder_text (text)
        VALUES ('When you have a dream, you’ve got to grab it and never let go.'),
        ('Nothing is impossible. The word itself says ‘I’m possible'),
        ('There is nothing impossible to they who will try.'),
        ('The bad news is time flies. The good news is you’re the pilot.'),
        ('Spread love everywhere you go.'),
        ('Believe you can and you’re halfway there.'),
        ('Weaknesses are just strengths in the wrong environment.'),
        ('In a gentle way, you can shake the world.'),
        ('Try to be a rainbow in someone’s cloud.'),
        ('Real change, enduring change, happens one step at a time.'),
        ('Wake up determined, go to bed satisfied.'),
        ('When it comes to luck, you make your own.'),
        ('If you don’t like the road you’re walking, start paving another one!');
            `
    )
    .then(() => {
      console.log('DB seeding is a success!!');
      res.sendStatus(200);
    })
    .catch((err) => console.log('error seeding DB', err));
};

module.exports = {
  seed,
};
