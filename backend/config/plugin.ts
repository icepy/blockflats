import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // session: true,
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  }
};

export default plugin;
