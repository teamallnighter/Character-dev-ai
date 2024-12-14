const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      { id: getId('LeadCreator'), name: 'Lead Creator', createdAt, updatedAt },

      {
        id: getId('SeniorCreator'),
        name: 'Senior Creator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('JuniorCreator'),
        name: 'Junior Creator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('CharacterDesigner'),
        name: 'Character Designer',
        createdAt,
        updatedAt,
      },

      {
        id: getId('ScenarioWriter'),
        name: 'Scenario Writer',
        createdAt,
        updatedAt,
      },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'characters',
      'scenarios',
      'traits',
      'versions',
      'roles',
      'permissions',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorCreator'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorCreator'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CharacterDesigner'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ScenarioWriter'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('CREATE_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('READ_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('UPDATE_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('DELETE_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('CREATE_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('READ_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('UPDATE_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('DELETE_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorCreator'),
        permissionId: getId('CREATE_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorCreator'),
        permissionId: getId('READ_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorCreator'),
        permissionId: getId('UPDATE_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CharacterDesigner'),
        permissionId: getId('CREATE_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CharacterDesigner'),
        permissionId: getId('READ_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CharacterDesigner'),
        permissionId: getId('UPDATE_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ScenarioWriter'),
        permissionId: getId('READ_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ScenarioWriter'),
        permissionId: getId('UPDATE_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('CREATE_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('READ_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('UPDATE_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('DELETE_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('CREATE_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('READ_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('UPDATE_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('DELETE_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorCreator'),
        permissionId: getId('CREATE_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorCreator'),
        permissionId: getId('READ_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorCreator'),
        permissionId: getId('UPDATE_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CharacterDesigner'),
        permissionId: getId('READ_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CharacterDesigner'),
        permissionId: getId('UPDATE_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ScenarioWriter'),
        permissionId: getId('CREATE_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ScenarioWriter'),
        permissionId: getId('READ_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ScenarioWriter'),
        permissionId: getId('UPDATE_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('CREATE_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('READ_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('UPDATE_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('DELETE_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('CREATE_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('READ_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('UPDATE_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('DELETE_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorCreator'),
        permissionId: getId('CREATE_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorCreator'),
        permissionId: getId('READ_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorCreator'),
        permissionId: getId('UPDATE_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CharacterDesigner'),
        permissionId: getId('CREATE_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CharacterDesigner'),
        permissionId: getId('READ_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CharacterDesigner'),
        permissionId: getId('UPDATE_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ScenarioWriter'),
        permissionId: getId('READ_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ScenarioWriter'),
        permissionId: getId('UPDATE_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('CREATE_VERSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('READ_VERSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('UPDATE_VERSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('DELETE_VERSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('CREATE_VERSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('READ_VERSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('UPDATE_VERSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('DELETE_VERSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorCreator'),
        permissionId: getId('CREATE_VERSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorCreator'),
        permissionId: getId('READ_VERSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorCreator'),
        permissionId: getId('UPDATE_VERSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CharacterDesigner'),
        permissionId: getId('READ_VERSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CharacterDesigner'),
        permissionId: getId('UPDATE_VERSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ScenarioWriter'),
        permissionId: getId('READ_VERSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ScenarioWriter'),
        permissionId: getId('UPDATE_VERSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCreator'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorCreator'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorCreator'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CharacterDesigner'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ScenarioWriter'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_CHARACTERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_CHARACTERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_CHARACTERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_CHARACTERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SCENARIOS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_SCENARIOS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_SCENARIOS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_SCENARIOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_TRAITS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_TRAITS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_TRAITS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_TRAITS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_VERSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_VERSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_VERSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_VERSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'LeadCreator',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SeniorCreator',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
