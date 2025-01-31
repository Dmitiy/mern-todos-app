# mern-todos-app

MERN

Try like this:

```javascript
const IMAGES = {
  image1: new URL('@images/1.jpg', import.meta.url).href,
};

import img1 from '@images/1.jpg';
```

## Indeterminate checkbox

[Indeterminate checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)

## classnames . How to use

```javascript
import classNames from 'classnames/bind';
import styles from './button.module.css';

// ✅ bind the styles to classNames
const cx = classNames.bind(styles);
const classes = cx(
  styles.button,
  {
    [styles.primary]: primary,
    [styles.secondary]: secondary,
  },
  className
);
```
