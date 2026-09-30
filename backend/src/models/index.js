import { sequelize } from '../config/db.js';
import { Link } from './link.js';
import { Click } from './click.js';

// Define relationship: One Link has Many Clicks
Link.hasMany(Click, { foreignKey: 'linkId', as: 'clicks', onDelete: 'CASCADE' });
Click.belongsTo(Link, { foreignKey: 'linkId', as: 'link' });

export { sequelize, Link, Click };