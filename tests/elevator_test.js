const assert = require('assert');

require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const Elevator = require('../elevator').default;

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
    assert.equal(elevator.countFloors(), 5);
  });

  it('should be able to keep track of amount of stops elevator takes', () => {

    assert.equal(elevator.countStops(), 0);
    let mockUser = { name: "Kenia", currentFloor: 0, dropOffFloor: 5 };

    elevator.goToFloor(mockUser);

    assert.equal(elevator.countStops(), 1)
  });
});
