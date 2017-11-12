var query = require('./connect').query;

class Partner {

  constructor(userId, name, description, 
      address) {
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.address = address;

    this.create = this.create.bind(this);
    this.toPublicResponse = this.toPublicResponse.bind(this);
  } 

  create() {
    return query(this.getInsertQuery());
  }

  getInsertQuery() {
    const fieldsList = '(name, description, address, addedBy)';
    const valuesList = `('${this.name}', '${this.description}', 
          '${this.address}', ${this.userId})`; 

    return `INSERT INTO partners ${fieldsList} VALUES ${valuesList}`;
  }

  setPartnerId(queryResult) {
    this.id = queryResult.insertId;
    return queryResult;
  }

  toPublicResponse() {
    return {
      'id': this.id,
      'name': this.name,
      'description': this.description,
      'address': this.address,
      'addedBy': this.userId 
    }
  }
}

exports.Partner =  Partner;
