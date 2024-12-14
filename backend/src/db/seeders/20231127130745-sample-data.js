const db = require('../models');
const Users = db.users;

const Characters = db.characters;

const Scenarios = db.scenarios;

const Traits = db.traits;

const Versions = db.versions;

const CharactersData = [
  {
    name: 'Ava the Adventurer',

    // type code here for "images" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Zara the Wizard',

    // type code here for "images" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Leo the Detective',

    // type code here for "images" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Mia the Scientist',

    // type code here for "images" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Noah the Explorer',

    // type code here for "images" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },
];

const ScenariosData = [
  {
    title: 'Jungle Exploration',

    content:
      'Ava navigates through the dense jungle, encountering various challenges.',
  },

  {
    title: 'Magic Duel',

    content: 'Zara faces off against a rival wizard in a battle of spells.',
  },

  {
    title: 'Crime Scene Investigation',

    content: 'Leo examines the crime scene for clues to solve the mystery.',
  },

  {
    title: 'Lab Experiment',

    content: 'Mia conducts a groundbreaking experiment in her lab.',
  },

  {
    title: 'Desert Trek',

    content: 'Noah embarks on a journey across the vast desert.',
  },
];

const TraitsData = [
  {
    description: 'Brave',
  },

  {
    description: 'Curious',
  },

  {
    description: 'Wise',
  },

  {
    description: 'Mysterious',
  },

  {
    description: 'Observant',
  },
];

const VersionsData = [
  {
    version_number: 'V1.0',

    created_on: new Date('2023-10-01T10:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    version_number: 'V1.1',

    created_on: new Date('2023-10-05T12:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    version_number: 'V1.0',

    created_on: new Date('2023-10-02T09:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    version_number: 'V1.2',

    created_on: new Date('2023-10-10T14:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    version_number: 'V1.0',

    created_on: new Date('2023-10-03T11:00:00Z'),

    // type code here for "relation_one" field
  },
];

// Similar logic for "relation_many"

async function associateCharacterWithCreator() {
  const relatedCreator0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Character0 = await Characters.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Character0?.setCreator) {
    await Character0.setCreator(relatedCreator0);
  }

  const relatedCreator1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Character1 = await Characters.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Character1?.setCreator) {
    await Character1.setCreator(relatedCreator1);
  }

  const relatedCreator2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Character2 = await Characters.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Character2?.setCreator) {
    await Character2.setCreator(relatedCreator2);
  }

  const relatedCreator3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Character3 = await Characters.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Character3?.setCreator) {
    await Character3.setCreator(relatedCreator3);
  }

  const relatedCreator4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Character4 = await Characters.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Character4?.setCreator) {
    await Character4.setCreator(relatedCreator4);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateVersionWithCharacter() {
  const relatedCharacter0 = await Characters.findOne({
    offset: Math.floor(Math.random() * (await Characters.count())),
  });
  const Version0 = await Versions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Version0?.setCharacter) {
    await Version0.setCharacter(relatedCharacter0);
  }

  const relatedCharacter1 = await Characters.findOne({
    offset: Math.floor(Math.random() * (await Characters.count())),
  });
  const Version1 = await Versions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Version1?.setCharacter) {
    await Version1.setCharacter(relatedCharacter1);
  }

  const relatedCharacter2 = await Characters.findOne({
    offset: Math.floor(Math.random() * (await Characters.count())),
  });
  const Version2 = await Versions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Version2?.setCharacter) {
    await Version2.setCharacter(relatedCharacter2);
  }

  const relatedCharacter3 = await Characters.findOne({
    offset: Math.floor(Math.random() * (await Characters.count())),
  });
  const Version3 = await Versions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Version3?.setCharacter) {
    await Version3.setCharacter(relatedCharacter3);
  }

  const relatedCharacter4 = await Characters.findOne({
    offset: Math.floor(Math.random() * (await Characters.count())),
  });
  const Version4 = await Versions.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Version4?.setCharacter) {
    await Version4.setCharacter(relatedCharacter4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Characters.bulkCreate(CharactersData);

    await Scenarios.bulkCreate(ScenariosData);

    await Traits.bulkCreate(TraitsData);

    await Versions.bulkCreate(VersionsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateCharacterWithCreator(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateVersionWithCharacter(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('characters', null, {});

    await queryInterface.bulkDelete('scenarios', null, {});

    await queryInterface.bulkDelete('traits', null, {});

    await queryInterface.bulkDelete('versions', null, {});
  },
};
