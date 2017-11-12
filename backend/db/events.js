var query = require('./connect').query;
var { validateDate, formatDate } = require('../utils');

class Event {

  constructor(userId, partnerId, name, description, 
      startDate, endDate, recurring) {
    this.userId = userId;
    this.partnerId = partnerId;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.recurring = recurring;

    this.create = this.create.bind(this);
    this.toPublicResponse = this.toPublicResponse.bind(this);
  } 

  create() {
    this.validateFields();
    return query(this.getInsertQuery());
  }

  validateFields() {
    validateDate(this.startDate);
    validateDate(this.endDate);
    if (!(this.userId && this.partnerId && this.name && this.description)) {
      throw new Error('failed to validate fields');
    }
  }

  getInsertQuery() {
    const formattedStart = formatDate(this.startDate);
    const formattedEnd = formatDate(this.endDate);
    const fieldsList = '(createdBy, partnerId, name, description,' 
                        + 'startDate, endDate, recurring)';
    const valuesList = `(${this.userId}, ${this.partnerId}, '${this.name}', 
                        '${this.description}', '${formattedStart}', 
                        '${formattedEnd}', ${this.recurring})`;

    return `INSERT INTO events ${fieldsList} VALUES ${valuesList}`;
  }

  setEventId(queryResult) {
    this.id = queryResult.insertId;
    return queryResult;
  }

  toPublicResponse() {
    return {
      'id': this.id,
      'name': this.name,
      'description': this.description,
      'startDate': this.startDate,
      'endDate': this.endDate,
      'recurring': this.recurring,
      'createdBy': this.userId,
      'partnerId': this.partnerId
    }
  }
}

exports.Event = Event;
