const assert = require('assert');

require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const Elevator = require('../elevator').default;
const Person = require('../person').default;

describe('Elevator', function() {
  let elevator = new Elevator();

  afterEach(function() {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [2, 5]);
  });

  it('should bring a rider to a floor below their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [8, 3]);
  });

  it('should be able to keep track of floors it has traversed', () => {
    let mockUser = { name: "Kenia", currentFloor: 0, dropOffFloor: 5 };

    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [0, 5]);
    console.log(elevator.stops)
    assert.equal(elevator.totalFloors, 5);
  });

  it.only('should be able to keep track of amount of stops elevator takes', () => {

    assert.equal(elevator.countStops(), 0);
    let mockUser = { name: "Kenia", currentFloor: 0, dropOffFloor: 5 };

    elevator.goToFloor(mockUser);

    assert.equal(elevator.countStops(), 1)
  });

it('should calculate floors traversed, going up', () => {
  let person = new Person("Brittany", 2,  7);

  elevator.goToFloor(person);

  assert.equal(elevator.currentFloor, 7);
  assert.equal(elevator.motionStatus, 'idle');
  assert.deepEqual(elevator.getStops(), [2, 7]);
  assert.equal(elevator.totalFloors, 7);
});

it('should calculate floorsTraversed, going down', () => {
  let person = new Person("Brittany", 8,  3);

  elevator.goToFloor(person);

  assert.equal(elevator.currentFloor, 3);
  assert.equal(elevator.motionStatus, 'idle');
  assert.deepEqual(elevator.getStops(), [8, 3]);
  assert.equal(elevator.totalFloors, 13);
});

it('should have a reset method', () => {
  let person = new Person("Brittany", 8,  3);

  elevator.goToFloor(person);

  assert.equal(elevator.currentFloor, 3);
  assert.deepEqual(elevator.getStops(), [8, 3]);
  assert.equal(elevator.totalFloors, 13);

  elevator.reset();

  assert.equal(elevator.currentFloor, 0);
  assert.deepEqual(elevator.getStops(), []);
  assert.equal(elevator.totalFloors, 0);
  assert.deepEqual(elevator.riders, []);
  assert.deepEqual(elevator.request, []);
});

it('should have a getStops method', () => {
  let person = new Person("Brittany", 8,  3);
  let person2 = new Person("Robbie", 8,  1);

  elevator.goToFloor(person);

  assert.deepEqual(elevator.getStops(), [8, 3]);

  elevator.goToFloor(person2);
  assert.deepEqual(elevator.getStops(), [8, 3, 8, 1]);
});

it('should have a getTraversed method', () => {
  let person = new Person("Brittany", 8,  3);
  let person2 = new Person("Robbie", 8,  1);

  elevator.goToFloor(person);

  assert.deepEqual(elevator.getStops(), [8, 3]);
  assert.equal(elevator.totalFloors, 13);

  elevator.goToFloor(person2);

  assert.deepEqual(elevator.getStops(), [8, 3, 8, 1]);
  assert.equal(elevator.totalFloors, 25);
});

it('should have a takeRider method', () => {
  let person = new Person("Brittany", 8,  3);
  let person2 = new Person("Robbie", 10,  11);

  elevator.request.push(person);
  assert.deepEqual(elevator.request.length, 1);
  assert.deepEqual(elevator.getStops(), []);

  elevator.takeRider();
  assert.deepEqual(elevator.request.length, 0);
  assert.deepEqual(elevator.getStops(), [8, 3]);
});

it('should move a person up and a person down', () => {
  let person = new Person("Brittany", 8,  3);
  let person2 = new Person("Robbie", 5,  1);

  elevator.goToFloor(person);
  elevator.goToFloor(person2);


  assert.deepEqual(elevator.getStops(), [8,3,5,1]);
  assert.equal(elevator.floorsTraversed, 19);
});
});
