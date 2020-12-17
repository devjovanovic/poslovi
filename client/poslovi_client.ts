let posaoCP = null;

mp.events.add('PostaviPosaoCP', (x,y,z, range) => {

    posaoCP = mp.checkpoints.new(4, new mp.Vector3(x,y,z - 1.0), range,
    {
        direction: new mp.Vector3(0, 0, 75),
        color: [ 255, 255, 255, 255 ],
        visible: true,
        dimension: player.dimension
    });
  
});

mp.events.add('UnistiPosaoCP', () => {
    if(posaoCP != null && posaoCP) {
      posaoCP.destroy();
    }
});


mp.events.add("UsaoCP", (checkpoint) => {
    if(posaoCP != null && checkpoint == posaoCP) {
      mp.events.callRemote("UsaoPosaoCP");
    }
});

export { poslovi_client };