import { classicTheme, proTheme, lightTheme } from './colors'

import fs from 'fs'

const generateCSS = () => {
  const css = `/* DO NOT EDIT - Edit colors.ts instead and then npm run css-vars or yarn run css-vars */
.classic {
  --color-primary: ${classicTheme.primary};
  --color-dark: ${classicTheme.dark};
  --color-eerie: ${classicTheme.eerie};
  --color-payne: ${classicTheme.payne};
  --color-grey: ${classicTheme.grey};
  --color-anti: ${classicTheme.anti};
  --color-offWhite: ${classicTheme.offWhite};
  --color-spring: ${classicTheme.spring};
  --color-atomic: ${classicTheme.atomic};
  --color-fire: ${classicTheme.fire};
  --color-robin: ${classicTheme.robin};
  --color-true: ${classicTheme.true};
  --color-burnt: ${classicTheme.burnt};
  --color-citron: ${classicTheme.citron};  
}

.pro {
  --color-primary: ${proTheme.primary};
  --color-dark: ${proTheme.dark};
  --color-eerie: ${proTheme.eerie};
  --color-payne: ${proTheme.payne};
  --color-grey: ${proTheme.grey};
  --color-anti: ${proTheme.anti};
  --color-offWhite: ${proTheme.offWhite};
  --color-spring: ${proTheme.spring};
  --color-atomic: ${proTheme.atomic};
  --color-fire: ${proTheme.fire};
  --color-robin: ${proTheme.robin};
  --color-true: ${proTheme.true};
  --color-burnt: ${proTheme.burnt};
  --color-citron: ${proTheme.citron};  
}

.light {
  --color-primary: ${lightTheme.primary};
  --color-dark: ${lightTheme.dark};
  --color-eerie: ${lightTheme.eerie};
  --color-payne: ${lightTheme.payne};
  --color-grey: ${lightTheme.grey};
  --color-anti: ${lightTheme.anti};
  --color-offWhite: ${lightTheme.offWhite};
  --color-spring: ${lightTheme.spring};
  --color-atomic: ${lightTheme.atomic};
  --color-fire: ${lightTheme.fire};
  --color-robin: ${lightTheme.robin};
  --color-true: ${lightTheme.true};
  --color-burnt: ${lightTheme.burnt};
  --color-citron: ${lightTheme.citron};  
}
/* DO NOT EDIT - Edit colors.ts instead and then npm run css-vars or yarn run css-vars */`

  fs.writeFileSync('./src/styles/_theme.css', css)
}

generateCSS()
