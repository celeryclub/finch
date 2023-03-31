const util = require("util");
const { SonosDevice } = require("@svrooij/sonos");
const { SonosEvents } = require("@svrooij/sonos");
// const ServiceEvents = require("@svrooij/sonos").ServiceEvents;

const sonosDevice = new SonosDevice(process.env.SONOS_HOST || "10.0.0.198");
console.log(sonosDevice);

// "PLAYING" | "STOPPED";
let mostRecentTransportState;
let mostRecentTrackMetadata;

sonosDevice.Events.on(SonosEvents.CurrentTransportStateSimple, (data) => {
  if (data !== mostRecentTransportState) {
    mostRecentTransportState = data;
    console.log(data);
  }
});

sonosDevice.Events.on(SonosEvents.CurrentTrackMetadata, (data) => {
  // console.log(data, mostRecentTrackMetadata);
  if (!util.isDeepStrictEqual(data, mostRecentTrackMetadata)) {
    mostRecentTrackMetadata = data;
    console.log(data.Title, "-", data.Artist);
    // ^ how can we show all artists here instead of just the first?
  }
});

process.on("SIGINT", () => {
  console.log("Hold on - cancelling all subscriptions");
  sonosDevice.CancelEvents();
  // sonosDevice.AlarmClockService.Events.removeAllListeners(
  //   ServiceEvents.ServiceEvent
  // );
  // sonosDevice.AVTransportService.Events.removeAllListeners(
  //   ServiceEvents.ServiceEvent
  // );
  // sonosDevice.RenderingControlService.Events.removeAllListeners(
  //   ServiceEvents.ServiceEvent
  // );
  // sonosDevice.ZoneGroupTopologyService.Events.removeAllListeners(
  //   ServiceEvents.ServiceEvent
  // );
  // setTimeout(() => {
  process.exit(0);
  // }, 3000);
});

// ---

// const { SonosManager } = require("@svrooij/sonos");
// const manager = new SonosManager();

// (async () => {
//   // const port = 1801;
//   // const scope = TestHelpers.getScope(port);
//   // TestHelpers.mockZoneGroupState(scope);
//   // process.env.SONOS_DISABLE_EVENTS = "true";
//   const manager = new SonosManager();
//   await manager.InitializeFromDevice("10.0.0.198");
//   await manager.CheckAllEventSubscriptions();
//   manager.CancelSubscription();
//   // delete process.env.SONOS_DISABLE_EVENTS;
// })();

// ---

// const { SonosManager } = require("@svrooij/sonos");
// const manager = new SonosManager();

// manager
//   .InitializeWithDiscovery(10)
//   .then(console.log)
//   .then(() => {
//     manager.Devices.forEach((d) => {
//       console.log(
//         "Device %s (%s) is joined in %s",
//         d.Name,
//         d.uuid,
//         d.GroupName
//       );
//       console.log(d);
//     });
//   })
//   .catch(console.error);

// ---

// const { SonosDevice } = require("@svrooij/sonos");

// const sonos = new SonosDevice(process.env.SONOS_HOST || "10.0.0.189");
// sonos
//   .LoadDeviceData()
//   .then((success) => {
//     console.log(sonos.Name);
//   })
//   .catch(console.error);

// ---

// const SonosDevice = require("@svrooij/sonos").SonosDevice;
// const ServiceEvents = require("@svrooij/sonos").ServiceEvents;
// const SonosEvents = require("@svrooij/sonos").SonosEvents;

// const kantoor = new SonosDevice(process.env.SONOS_HOST || "10.0.0.189");

// // const kantoor = new SonosDevice(
// //   process.env.SONOS_HOST || "192.168.96.56",
// //   1400,
// //   "RINCON_000Esecret1400"
// // );

// kantoor.Events.on(SonosEvents.Error, (err) => {
//   console.error("Subscribe error", err);
// });

// kantoor.Events.on(SonosEvents.CurrentTransportStateSimple, (state) => {
//   console.log("New State %s", state.toString());
// });

// kantoor.AlarmClockService.Events.on(ServiceEvents.ServiceEvent, (data) => {
//   console.log("AlarmClock data %s", JSON.stringify(data));
// });

// kantoor.ZoneGroupTopologyService.Events.on(ServiceEvents.Error, (err) => {
//   console.error("Subscribe error for ZoneGroupTopologyService", err);
// });

// kantoor.ZoneGroupTopologyService.Events.on(
//   ServiceEvents.ServiceEvent,
//   (data) => {
//     console.log("ZoneGroupTopology data %s", JSON.stringify(data));
//   }
// );

// kantoor.AVTransportService.Events.on(ServiceEvents.ServiceEvent, (data) => {
//   console.log("AVTransport lastchange %s", JSON.stringify(data, null, 2));
// });

// kantoor.RenderingControlService.Events.on(
//   ServiceEvents.ServiceEvent,
//   (data) => {
//     console.log(
//       "RenderingControl lastchange %s",
//       JSON.stringify(data, null, 2)
//     );
//   }
// );

// setInterval(async () => {
//   const result = await kantoor.RefreshEventSubscriptions();
//   console.log("Succesfully refreshed the events %s", result);
// }, 300 * 1000);

// process.on("SIGINT", () => {
//   console.log("Hold-on cancelling all subscriptions");
//   kantoor.CancelEvents();
//   kantoor.AlarmClockService.Events.removeAllListeners(
//     ServiceEvents.ServiceEvent
//   );
//   kantoor.AVTransportService.Events.removeAllListeners(
//     ServiceEvents.ServiceEvent
//   );
//   kantoor.RenderingControlService.Events.removeAllListeners(
//     ServiceEvents.ServiceEvent
//   );
//   kantoor.ZoneGroupTopologyService.Events.removeAllListeners(
//     ServiceEvents.ServiceEvent
//   );
//   setTimeout(() => {
//     process.exit(0);
//   }, 3000);
// });

// ---

// const SonosDevice = require("@svrooij/sonos").SonosDevice;
// const ServiceEvents = require("@svrooij/sonos").ServiceEvents;
// const SonosEvents = require("@svrooij/sonos").SonosEvents;

// const sonosDevice = new SonosDevice(process.env.SONOS_HOST || "10.0.0.189");

// // SonosEvents
// sonosDevice.Events.on(SonosEvents.CurrentTrackUri, (uri) => {
//   console.log("Current track changed %s", uri);
// });

// sonosDevice.Events.on(SonosEvents.CurrentTrackMetadata, (data) => {
//   console.log("Current track metadata %s", JSON.stringify(data));
// });

// sonosDevice.Events.on(SonosEvents.Volume, (volume) => {
//   console.log("New volume %d", volume);
// });

// // Events from Services
// sonosDevice.AlarmClockService.Events.on(ServiceEvents.Data, (data) => {
//   console.log("AlarmClock data %s", JSON.stringify(data));
// });

// sonosDevice.AVTransportService.Events.on(ServiceEvents.Data, (data) => {
//   console.log("AVTransport data %s", JSON.stringify(data, null, 2));
// });
// sonosDevice.RenderingControlService.Events.on(ServiceEvents.Data, (data) => {
//   console.log("RenderingControl data %s", JSON.stringify(data, null, 2));
// });

// console.log("About to set interval");

// setInterval(async () => {
//   const result = await sonosDevice.RefreshEventSubscriptions();
//   console.log("Succesfully refreshed the events %s", result);
// }, 300 * 1000);

// process.on("SIGINT", () => {
//   console.log("Hold-on cancelling all subscriptions");
//   sonosDevice.CancelEvents();
//   sonosDevice.AlarmClockService.Events.removeAllListeners(
//     ServiceEvents.ServiceEvent
//   );
//   sonosDevice.AVTransportService.Events.removeAllListeners(
//     ServiceEvents.ServiceEvent
//   );
//   sonosDevice.RenderingControlService.Events.removeAllListeners(
//     ServiceEvents.ServiceEvent
//   );
//   sonosDevice.ZoneGroupTopologyService.Events.removeAllListeners(
//     ServiceEvents.ServiceEvent
//   );
//   setTimeout(() => {
//     process.exit(0);
//   }, 3000);
// });
