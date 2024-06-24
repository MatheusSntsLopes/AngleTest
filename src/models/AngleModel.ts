// src/models/AngleModel.ts
import { Sequelize, DataTypes, type Model, type ModelCtor } from "sequelize";

interface IAngle extends Model {
  id?: number;
  hour: number;
  minute: number;
  angle: number;
  date?: Date;
}
const sequelize = new Sequelize('postgres://mgqtkdje:RS8dAh5cIyPebXOEQdyOYQAhs9IqwMgm@silly.db.elephantsql.com/mgqtkdje');

const AngleModel: ModelCtor<IAngle> = sequelize.define<IAngle>('Angle', {
  hour: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  minute: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  angle: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

export { sequelize, AngleModel };
