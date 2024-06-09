import './Cat.css';
import * as React from 'react';

export default function Cat() {

    React.useEffect(() => {

        const anim = document.createElement('script');
        anim.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
        anim.type = "module";
        document.body.appendChild(anim);

        const script = document.createElement('script');      
        script.src = "cat.js";
        script.async = true;
        document.body.appendChild(script);

      
        return () => {
          document.body.removeChild(script);
          document.body.removeChild(anim);
        }
      }, []);

    return (<div id="cattie" className="cat-container" />)
}

