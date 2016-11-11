/**
 * Created by ben on 11/11/16.
 */

export class ModelConfig {
  scale: number;
  posX: number;
  posY: number;
  posZ: number;
  colour: number;
}

export class ModelConfigFactory {
  static Normal(): ModelConfig{
    var config = new ModelConfig();
    config.scale = 1/1000;
    config.posX = 0;
    config.posY = 0;
    config.posZ = 2;
    config.colour = 0xf4a460;
    return config;
  }

  static Kicker(): ModelConfig{
    var config = new ModelConfig();
    config.scale = 2/1000;
    config.posX = -1.5;
    config.posY = 0;
    config.posZ = 0;
    config.colour = 0x747485;
    return config;
  }
}

export class WakeParkItem{
  public name: string;
  public description: string;
  public thumbPath: string;
  public modelPath: string;
  public modelConfig: ModelConfig;
}

export const WakeParkItems: WakeParkItem[] = [
  {
    name: "V3 Deployed",
    description:
    "The slider after three iterations of development. This shows the slider in the set-up state. It is made up " +
    "of three separate module which are bolted together using M12 bolts",
    modelPath: "./assets/V3-Setup-Lower.stl",
    thumbPath: "./assets/V3-Setup-Lower.png",
    modelConfig: ModelConfigFactory.Normal()
  },
  {
    name: "V3 Packed",
    description:
    "When not being used the slider can be dissasembled into it's transport state. " +
    "The three modules can be unbolted and stacked on top of each other, this provides" +
    "a relatively compact kit which can also house other gear beneath.",
    modelPath: "./assets/V3-PackedUp-Lower.stl",
    thumbPath: "./assets/V3-PackedUp-Lower.png",
    modelConfig: ModelConfigFactory.Normal()
  },
  {
    name: "V3-WIDE Deployed",
    description:
    "A small redesign on version 3, allowed for the width of the top to be increased for easier riding. This shows the slider in the set-up state. It is made up " +
    "of three separate module which are bolted together using M12 bolts",
    modelPath: "./assets/V3W-Setup.stl",
    thumbPath: "./assets/V3-Setup-Lower.png",
    modelConfig: ModelConfigFactory.Normal()
  },
  {
    name: "V3-WIDE Packed",
    description:
    "Just like the previous slider, when not being used the slider can be dissasembled into it's transport state. " +
    "The three modules can be unbolted and stacked on top of each other, this provides" +
    "a relatively compact kit which can also house other gear beneath.",
    modelPath: "./assets/V3W-PackedUp.stl",
    thumbPath: "./assets/V3-PackedUp-Lower.png",
    modelConfig: ModelConfigFactory.Normal()
  },
  {
    name: "Kicker Old Design",
    description:
      "This is an old model of a Kicker I made, a long time ago. It was made using SolidWorks (I'm an inventor guy now)",
    modelPath: "./assets/kicker_frame.stl",
    thumbPath: "./assets/kicker_frame.png",
    modelConfig: ModelConfigFactory.Kicker()
  },
];
