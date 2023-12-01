

const puppeteer = require('puppeteer');








(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage()
    await page.goto("https://www.google.com/maps/search/bili%C5%9Fim+firmalar%C4%B1/@38.3872349,27.0736581,14.75z?authuser=0&hl=tr&entry=ttu")
    
    


    async function autoScroll(page) {
      await page.evaluate(async () => {
        const wrapper = document.querySelector('div[role="feed"]');

        await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 1000;
          var scrollDelay = 3000;

          var timer = setInterval(async () => {
            var scrollHeightBefore = wrapper.scrollHeight;
            wrapper.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeightBefore) {
              totalHeight = 0;
              await new Promise((resolve) => setTimeout(resolve, scrollDelay));

              // Calculate scrollHeight after waiting
              var scrollHeightAfter = wrapper.scrollHeight;

              if (scrollHeightAfter > scrollHeightBefore) {
                // More content loaded, keep scrolling
                return;
              } else {
                // No more content loaded, stop scrolling
                clearInterval(timer);
                resolve();
              }
            }
          }, 200);
        });
      });
    }   

        
        await autoScroll(page)
        let parents = {};
        let parentsWithOut = [];
        const grabInfo = await page.evaluate(() => {
                const parentAnchors = Array.from(document.querySelectorAll("a.lcr4fd.S9kvJb"));
                const parentHrefs = parentAnchors.map(anchor => anchor.href)
                const anchors = Array.from(document.querySelectorAll('a.hfpxzc'));
                const hrefs = anchors.map(anchor => anchor.href); 
                const hrefsElements = hrefs.filter(href => href.includes('/maps/place/'))
                
                const allParents = Array.from(document.querySelectorAll('div.Rwjeuc'))
                const allParent = allParents.map(childern => childern.innerHTML)
                return myObject = {
                    links: parentHrefs,
                    elements:allParent
                }
                
                // if(allParent.includes(parent => parent.parentHrefs)){
                //     return allParent.map(item => item.href)
                // }else{
                    
                // }
                
            
            
             
        });
        
    
    //    parentsWithOut = grabInfo.filter(info => info.includes("/maps/place/"))
    //    parents = grabInfo.filter(info => !info.includes("/maps/place/"))
       
    //    if(Object.values(grabInfo).includes(grabInfo.links)){
    //     parents = grabInfo.elements.filter(item => item.includes("href"))
    //    }else{

    //    }
       parents = grabInfo
       console.log(parents.links)
        
       
    await browser.close();

    
})();



