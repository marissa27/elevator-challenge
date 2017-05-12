export default class Elevator {
  constructor() {
    this.request = [];
    this.riders = [];
    this.motionStatus = 'idle';
    this.dropOffFloor = 0;
    this.currentFloor = 0;
    this.stops = [];
    this.totalFloors = 0;
  };

  reset() {
    this.request = [];
    this.riders = [];
    this.motionStatus = 'idle';
    this.dropOffFloor = 0;
    this.currentFloor = 0;
    this.stops = [];
    this.totalFloors = 0;
  };

  goToFloor(person) {
    if (person) {
      this.request.push(person)
    }
    if (this.request.length) {
      let rider = this.request[0];
      let cF = rider.currentFloor;
      this.addRider(person);
      this.currentFloor = rider.dropOffFloor;
      console.log(this.currentFloor)
      this.addStops(rider.currentFloor, rider.dropOffFloor)
    }
  };

  addRider(person) {
    this.riders.push(person);
    this.status = 'moving';
  }

  addStops(cf, df) {
    console.log(cf, df)
    let last = this.stops.splice(-1)[0];
    console.log(this.stops)
    if (last === this.cf) {
      this.stops.push(df)
    } else {
      this.stops.push(cf, df)
    }
  }

  getStops() {
    return [this.request[0].currentFloor, this.currentFloor]
  };

  countStops() {
    return this.stops.reduce((int, fl) => {
      this.totalFloors = int;
      int + Math.abs(int - fl);
      return int
    }, 0)
  }

  countFloors() {
    return this.stops.reduce((int, fl) => {
      this.totalFloors += int;
      int + Math.abs(int - fl);
      return int
    }, 0)
  }

}
