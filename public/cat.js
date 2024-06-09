
(function() {

const chances = Math.random() * 100;

if (chances < 5) {
    const player = document.createElement('lottie-player');
    player.src = "/cat.json";
    player.background = "transparent";
    player.speed = "1";
    player.style = "width: 100%; height: 100%";
    player.direction = "1";
    player.mode = "normal";
    player.autoplay = true;
    player.id = "cattie-player";
    player.viewBoxSize = "-1200 0 1920 1080";

    player.addEventListener('frame', function(e) {
        
        if (e.timeStamp > 4000 && !document.getElementById('ttip')) {

            const ttip_container = document.createElement('div');
            ttip_container.className = "tooltip_container";
            ttip_container.id = "tooltip_container";
            const container = document.getElementById('cattie');
            container.append(ttip_container);

            const ttip = document.createElement('div');
            ttip.className = "tooltip right";
            ttip.id = "ttip";
            ttip.innerHTML = "Hi!!!";

            ttip_container.append(ttip);

            var i = 0;
            var txt = ">Did you know, that you can earn about 34 points a day if you<(brush your teeth morning and evening)(do you math at least 1 time)(do cat chores)>It is 238 points a week, and 952 points a month!!!<";
            
            ch = Math.random() * 2;
            if (ch < 1)
                txt = ">Doing math is very profitable!< >You can do math every hour starting from 7am till 7pm! And it will be total of 180 points a day just for math<";
            var cnvText = "Hi!!!";

            function typeWriter() {
                if (i < txt.length) {
                    if (txt.charAt(i) == '>')
                        cnvText += "<p>";
                    else if (txt.charAt(i)=='<')
                        cnvText += "</p>";
                    else if (txt.charAt(i)=='(')
                        cnvText += "<li>";
                    else if (txt.charAt(i)==')')
                        cnvText += "</li>";
                    else
                        cnvText += txt.charAt(i);

                    document.getElementById("ttip").innerHTML = cnvText;
                  i++;
                  setTimeout(typeWriter, 50);
                } else {
                    setTimeout(function() {
                        ttip_container.style.display = "none";
                        document.getElementById('cattie').style.display = "none";
                    }, 10000);
                }
            };
            typeWriter();
        }
    });

    if (!document.getElementById('cattie-player')) {
        const container = document.getElementById('cattie');
        container.append(player);
    }
    
}

})();