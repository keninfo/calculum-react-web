import { classicTheme, proTheme, lightTheme } from './colors'

import fs from 'fs'

const generateCSS = () => {
  const css = `/* DO NOT EDIT - Edit colors.ts instead and then npm run css-vars or yarn run css-vars */
.classic {
  --color-darkness: ${classicTheme.darkness};
  --color-smoke: ${classicTheme.smoke};
  --color-primary: ${classicTheme.primary};
  --color-white: ${classicTheme.white};
  --color-greySmoke: ${classicTheme.greySmoke};
}

.pro {
  --color-darkness: ${proTheme.darkness};
  --color-smoke: ${proTheme.smoke};
  --color-primary: ${proTheme.primary};
  --color-white: ${proTheme.white};
  --color-greySmoke: ${proTheme.greySmoke};
}

.light {
  --color-darkness: ${lightTheme.darkness};
  --color-smoke: ${lightTheme.smoke};
  --color-primary: ${lightTheme.primary};
  --color-white: ${lightTheme.white};
  --color-greySmoke: ${lightTheme.greySmoke};
}
/* DO NOT EDIT - Edit colors.ts instead and then npm run css-vars or yarn run css-vars */`

  fs.writeFileSync('./src/styles/_theme.css', css)
}

generateCSS()
