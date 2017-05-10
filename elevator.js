export default class Elevator {
  constructor() {
    this.request = [];
    this.motionStatus = 'idle';
    this.dropOffFloor = 0;
    this.currentFloor = 0;
    this.stopsCounter = 0;
    this.totalFloors = 0;
  };

  reset() {
    this.dropOffFloor = 0;
    this.grabFloor = 0;
    this.request = [];
    this.stopsCounter = 0;
    this.totalFloors = 0;
    this.currentFloor = 0;
  };

  goToFloor(rider) {
    this.request.unshift(rider)
    if (this.motionStatus === 'idle') {
      this.motionStatus = 'moving';
      this.currentFloor = 0;
    } else if (this.motionStatus === 'moving') {
      this.currentFloor = request.currentFloor
    }
  };

  getStops() {
    return [this.request[0].currentFloor, this.currentFloor]
  };

  countFloors() {
    return this.request.map(a => {
      const arr = [];
      const currFl = a.currentFloor;
      const dropFl = a.dropOffFloor;
      const total = Math.abs(currFl - dropFl);
      arr.push(total)

      return arr.reduce((acc, a, b) => {
        acc = a + b;
        return this.totalFloors = acc;
      }, 0)
    })
  }

  countStops() {

  }

}
