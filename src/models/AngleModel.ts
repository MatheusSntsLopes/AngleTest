// src/models/AngleModel.ts
import { Sequelize, DataTypes, type Model } from "sequelize";

interface IAngle extends Model {
  id?: number;
  hour: number;
  minute: number;
  angle: number;
  date?: Date;
}
const sequelize = new Sequelize('postgres://kmwxfndl:3C3ETAEdH2d2Y3qk39NdGapXWhH2r-km@isabelle.db.elephantsql.com/kmwxfndl');

const AngleModel = sequelize.define<IAngle>('Angle', {
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
