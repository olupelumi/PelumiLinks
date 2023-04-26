## Background and Problem

- I’m looking to build a small full-stack project to continue improving my ability to work on full stack web applications
- It’ll make searching up deep links that I use somewhat often super quick for me [by using some type of link that uses a systematic code]
    - will start with me saving associations but maybe I can do a systematic code based on how the site does their URLs

Go links 

[GoLinks](https://chrome.google.com/webstore/detail/golinks/mdkgfdijbhbcbajcdlebbodoppgnmhab?hl=en-US)

Tiny Url 

## Solution

URL redirecting system 

https://user-images.githubusercontent.com/43530539/234718608-38b7efe7-9b70-4001-80b5-bbb5da328e00.mov

Link to the [Notion page](https://www.notion.so/pelumi/Tinyurl-golink-alternative-b6670a749a084ad7886e09d931a7d16e)

![image](https://user-images.githubusercontent.com/43530539/224586908-321258cc-6a12-48ed-b196-5f58c4bbf2ef.png)

Specs:

- [domain name].com/r/{shortcut}
    - {shortcut} maps to a website like notion.com/SideProject
- The mapping should be a 1:1 function
    - Two shortcuts can’t map to the same website
    - One link can’t be mapped to from the same shortcut
- Creation, reading, updating, and deletion of a mapping should be supported.
- No chrome extension like go link - Just a web page at the moment
