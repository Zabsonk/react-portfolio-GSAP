import { Color, Application, Container, Ticker, EventEmitter } from "pixi.js";

export interface BrowserApplicationConfig {
  container: HTMLDivElement;
  backgroundColor: number;
  backgroundAlpha: number;
  baseWidth: number;
  baseHeight: number;
}

export default class BrowserApplication extends EventEmitter {
  readonly defaultConfig: Partial<BrowserApplicationConfig> = {
    backgroundColor: 0x000000,
    baseWidth: 1920,
    baseHeight: 1080,
  };
  protected container: HTMLDivElement;
  protected mainScreen: Application;

  protected currentHeight: number = 0;
  protected currentWidth: number = 0;

  protected config: Partial<BrowserApplicationConfig>;

  constructor(config: Partial<BrowserApplicationConfig>) {
    super();
    this.config = { ...this.defaultConfig, ...config };

    this.container = config.container!;

    if (config.backgroundAlpha) {
      this.container.style.backgroundColor = Color.shared
        .setValue(this.config.backgroundColor!)
        .toHex();
    }
    this.container.style.overflow = "hidden";
    this.container.style.position = "absolute";
    this.container.style.top = "50%";
    this.container.style.left = "50%";
    this.container.style.transform = "translate(-50%, -50%)";
    this.container.style.justifyContent = "center";
    this.container.style.alignItems = "center";
    this.container.style.zIndex = "1";

    this.mainScreen = new Application();

     new ResizeObserver(() => {
        this.onResize();
    }).observe(this.container);
  }

  public async init(): Promise<void> {
    await this.mainScreen.init({
      backgroundColor: this.config.backgroundColor,
      width: this.config.baseWidth,
      height: this.config.baseHeight,
      resizeTo: this.container,
    }).then(() => {
      this.container.prepend(this.mainScreen.canvas);
    });
    this.onResize();
  }

  public resume(): void {
    this.mainScreen.ticker.start();
  }

   public stop(): void {
    this.mainScreen.ticker.stop();
  }

  public addToTicker(fn: (delta: Ticker) => void, context?: Container): void {
    this.mainScreen.ticker.add(fn, context);
  }

  public addChild(child: Container): void {
    this.mainScreen.stage.addChild(child);
  }

  public get width(): number {
    return this.currentWidth
  }

  public get height(): number {
    return this.currentHeight;
  }

  public get ticker() {
    return this.mainScreen.ticker;
  }

  protected onResize(): void {
    this.currentWidth = this.mainScreen.screen.width;
    this.currentHeight = this.mainScreen.screen.height;
    this.emit("onResize", this.currentWidth, this.currentHeight);
  }
}
