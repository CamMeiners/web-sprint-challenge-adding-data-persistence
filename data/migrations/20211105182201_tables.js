exports.up = function (knex) {
  return knex.schema
    .createTable('projects', (tbl) => {
      tbl.increments('project_id');
      tbl.text('project_name').unique().notNullable();
      tbl.text('project_description');
      tbl.boolean('project_completed').defaultTo(false);
    })
    .createTable('tasks', (tbl) => {
      tbl.increments('task_id');
      tbl.text('task_description').notNullable();
      tbl.text('task_notes');
      tbl.boolean('task_completed').defaultTo(false);
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('resources', (tbl) => {
      tbl.increments('resource_id');
      tbl.text('resource_name').notNullable().unique();
      tbl.text('resource_description');
    })
    .createTable('projects_resources', (tbl) => {
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resource_id')
        .inTable('resources')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('projects_resources')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects');
};
