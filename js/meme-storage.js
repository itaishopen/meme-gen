const gMemes = [
    { id: '112126428', name: 'Distracted Boyfriend', url: 'https://i.imgflip.com/1ur9b0.jpg', width: 1200, height: 800, rate: 0, tags: ['jealousy', 'unfaithful guy', 'disloyal man with his girlfriend looking at another girl', 'distracted boyfriend', 'commercial'] },
    { id: '87743020', name: 'Two Buttons', url: 'https://i.imgflip.com/1g8my4.jpg', width: 600, height: 908, rate: 0, tags: ['be a dick', "don't be a dick", 'jake clark', 'exploitable', 'daily struggle', 'choose, button', 'two buttons'] },
    { id: '155067746', name: 'Surprised Pikachu', url: 'https://i.imgflip.com/2kbn1e.jpg', width: 1893, height: 1893, rate: 0, tags: ['surprised pikachu', 'pokemon', 'me_irl', 'reaction image', 'surprised', 'tv'] },
    { id: '102156234', name: 'Mocking Spongebob', url: 'https://i.imgflip.com/1otk96.jpg', width: 502, height: 353, rate: 0, tags: ['mocking spongebob', 'spongebob', 'mocking', 'nicktoons', 'cartoons', 'spongebob squarepants', 'spongemock', 'tv'] },
    { id: '93895088', name: 'Expanding Brain', url: 'https://i.imgflip.com/1jwhww.jpg', width: 857, height: 1202, rate: 0, tags: ['expanding brain', 'brain', 'expanding', 'knowledge', 'whomst', 'intelligence', 'exploitable', 'image series'] },
    { id: '124822590', name: 'Left Exit 12 Off Ramp', url: 'https://i.imgflip.com/22bdq6.jpg', width: 804, height: 767, rate: 0, tags: ['left exit 12 off ramp', 'car', 'off ramp', 'photoshop', 'wrong choice'] },
    { id: '438680', name: 'Batman Slapping Robin', url: 'https://i.imgflip.com/9ehk.jpg', width: 400, height: 387, rate: 0, tags: ['batman slapping robin', 'batman', 'superhero', 'comic'] },
    { id: '119139145', name: 'Blank Nut Button', url: 'https://i.imgflip.com/1yxkcp.jpg', width: 600, height: 446, rate: 0, tags: ['button', 'nut', 'blank nut button'] },
    { id: '89370399', name: 'Roll Safe Think About It', url: 'https://i.imgflip.com/1h7in3.jpg', width: 702, height: 395, rate: 0, tags: ['roll safe think about it', 'black twitter', 'reaction', 'thinking', 'think smart', 'be smart', 'rollsafe', "it's not", 'if you', 'logic', 'public service announcement', 'psa'] },
    { id: '4087833', name: 'Waiting Skeleton', url: 'https://i.imgflip.com/2fm6x.jpg', width: 298, height: 403, rate: 0, tags: ['waiting skeleton', 'wait', 'skeleton', 'the plug', 'reaction imagery', 'response'] },
    { id: '100777631', name: 'Is This A Pigeon', url: 'https://i.imgflip.com/1o00in.jpg', width: 1587, height: 1425, rate: 0, tags: ['is this a pigeon', 'anime', 'response', 'reaction imagery', 'the brave fighter of sun fighbird'] },
    { id: '1035805', name: 'Boardroom Meeting Suggestion', url: 'https://i.imgflip.com/m78d.jpg', width: 500, height: 649, rate: 0, tags: ['boardroom meeting suggestion', 'meeting', 'suggestion', 'hejibits', 'exploitable', 'vertical comic', '5pane', '5 panel', 'wrong choice'] },
    { id: '61579', name: 'One Does Not Simply', url: 'https://i.imgflip.com/1bij.jpg', width: 568, height: 335, rate: 0, tags: ['one does not simply', 'catchphrase', 'lotr', 'fantasy', 'pop-culture', 'movie quote', 'walks into mordor', 'blacklist', 'pop culture', 'snowclone', 'phrasal template', 'boromir', 'peter jackson', 'j.r.r. tolkien', 'movie'] },
    { id: '27813981', name: 'Hide the Pain Harold', url: 'https://i.imgflip.com/gk5el.jpg', width: 480, height: 601, rate: 0, tags: ['hide the pain harold', 'facepunch', 'harold', 'discomfort', 'tv', 'commercial'] },
    { id: '114585149', name: 'Inhaling Seagull', url: 'https://i.imgflip.com/1w7ygt.jpg', width: 1269, height: 2825, rate: 0, tags: ['inhaling seagull', 'seagull', 'bird', 'exploitable'] },
    { id: '101470', name: 'Ancient Aliens', url: 'https://i.imgflip.com/26am.jpg', width: 500, height: 437, rate: 0, tags: ['ancient', 'aliens', 'channel', 'scifi', 'parody', 'history', 'notables of 2011', 'ancient aliens', 'tv'] },
    { id: '91545132', name: 'Trump Bill Signing', url: 'https://i.imgflip.com/1ii4oc.jpg', width: 1866, height: 1529, rate: 0, tags: ['trump bill signing', 'donald trump', 'photoshop', 'trump first order of business'] },
    { id: '134797956', name: 'American Chopper Argument', url: 'https://i.imgflip.com/2896ro.jpg', width: 640, height: 1800, rate: 0, tags: ['american chopper argument', 'argument', 'american choppers', 'american chopper', 'paul teutul sr', 'paul teutul jr', 'orange county chopper', 'orange county choppers', 'occ', 'paul teutel', 'chopper boys', 'tv'] },
    { id: '124055727', name: "Y'all Got Any More Of That", url: 'https://i.imgflip.com/21uy0f.jpg', width: 600, height: 471, rate: 0, tags: ["y'all got any more of that", 'you all got any more of that', 'crack', 'addiction', 'comedian', 'chappelle', 'crack head', 'request', 'tv'] },
    { id: '123999232', name: 'The Scroll Of Truth', url: 'https://i.imgflip.com/21tqf4.jpg', width: 1280, height: 1236, rate: 0, tags: ['the scroll of truth', 'comic', 'web comic', 'truth'] },
    { id: '61520', name: 'Futurama Fry', url: 'https://i.imgflip.com/1bgw.jpg', width: 552, height: 414, rate: 0, tags: ['futurama fry', 'futurama', 'blacklist', 'fry', 'not sure if', "can't tell if", 'tv', 'reaction image'] },
    { id: '91538330', name: 'X, X Everywhere', url: 'https://i.imgflip.com/1ihzfe.jpg', width: 2118, height: 1440, rate: 0, tags: ['x, x everywhere', 'everywhere', 'board', 'disney', 'toy story', 'movie'] },
    { id: '21735', name: 'The Rock Driving', url: 'https://i.imgflip.com/grr.jpg', width: 568, height: 700, rate: 0, tags: ['the rock driving', 'the rock', 'driving', 'newgrounds', 'exploitable', '3pane', 'comic', 'dramatic', 'photoshop', 'multi pane', 'vertical comic', 'movie'] },
    { id: '61532', name: 'The Most Interesting Man In The World', url: 'https://i.imgflip.com/1bh8.jpg', width: 550, height: 690, rate: 0, tags: ['the most interesting man in the world', 'commercial', 'catchphrase', 'tv personality', 'pop culture', 'snowclone', 'phrasal template', 'good looking', 'super bowl', 'ad', 'tv'] },
    { id: '132769734', name: 'Hard To Swallow Pills', url: 'https://i.imgflip.com/271ps6.jpg', width: 680, height: 979, rate: 0, tags: ['hard to swallow pills', 'pills that make you stare', 'wikihow', 'medicine', 'comic'] },
    { id: '97984', name: 'Disaster Girl', url: 'https://i.imgflip.com/23ls.jpg', width: 500, height: 375, rate: 0, tags: ['photoshop', 'mainstream', 'exploitables', 'disaster', 'girl', 'disaster girl'] },
    { id: '28251713', name: 'Oprah You Get A', url: 'https://i.imgflip.com/gtj5t.jpg', width: 620, height: 465, rate: 0, tags: ['remix', 'advice animal', 'oprah you get a', 'oprah', 'tv personality', 'happy', 'tv'] },
    { id: '84341851', name: 'Evil Kermit', url: 'https://i.imgflip.com/1e7ql7.jpg', width: 700, height: 325, rate: 0, tags: ['evil kermit', 'kemit the frog', 'muppet', 'dark kermit', 'darth kermit', 'tv'] },
    { id: '61546', name: 'Brace Yourselves X is Coming', url: 'https://i.imgflip.com/1bhm.jpg', width: 622, height: 477, rate: 0, tags: ['brace yourselves x is coming', 'game of thrones', 'got', 'ned stark', 'imminent', 'ned', 'stark', 'brace yourself', 'winter is coming', 'tv'] },
    { id: '6235864', name: 'Finding Neverland', url: 'https://i.imgflip.com/3pnmg.jpg', width: 423, height: 600, rate: 0, tags: ['finding neverland', 'johnny depp', 'freddie highmore', 'conversation', 'movie'] },
    { id: '101910402', name: 'Who Would Win?', url: 'https://i.imgflip.com/1ooaki.jpg', width: 802, height: 500, rate: 0, tags: ['who would win', 'exploitable', 'solid snake', 'compare'] },
    { id: '563423', name: 'That Would Be Great', url: 'https://i.imgflip.com/c2qn.jpg', width: 526, height: 440, rate: 0, tags: ['that would be great', 'office space', "that'd be great", 'that would be great', 'it would be great', 'movie character', 'movie'] },
    { id: '5496396', name: 'Leonardo Dicaprio Cheers', url: 'https://i.imgflip.com/39t1o.jpg', width: 600, height: 400, rate: 0, tags: ['leonardo dicaprio cheers', 'cheer', 'the great gatsby', 'leonardo dicaprio', 'reaction image', 'movie'] },
    { id: '101288', name: 'Third World Skeptical Kid', url: 'https://i.imgflip.com/265k.jpg', width: 426, height: 426, rate: 0, tags: ['third world skeptical kid', 'skeptical', 'kid', 'third world', "don't believe you"] },
    { id: '61585', name: 'Bad Luck Brian', url: 'https://i.imgflip.com/1bip.jpg', width: 475, height: 562, rate: 0, tags: ['bad luck brian', 'advice animal', 'unfortunate', 'incontinence', 'awkward', 'notables of 2012', 'advice', 'advice animals of 2012', 'full circles of 2012', 'yearbook'] },
    { id: '16464531', name: 'But Thats None Of My Business', url: 'https://i.imgflip.com/9sw43.jpg', width: 600, height: 600, rate: 0, tags: ["but thats none of my business", 'muppets', 'tea', 'kermit the frog', 'tealizard', "that's none of my business", "but that's none of my business tho", 'tv'] },
    { id: '14230520', name: 'Black Girl Wat', url: 'https://i.imgflip.com/8h0c8.jpg', width: 599, height: 626, rate: 0, tags: ['black girl what', 'confused black girl', 'confused', 'what', 'reaction', 'girl', 'black', 'shrugging'] },
    { id: '61539', name: 'First World Problems', url: 'https://i.imgflip.com/1bhf.jpg', width: 552, height: 367, rate: 0, tags: ['first world problems', 'best of 2011', 'notables of 2011', 'white people problems', '1st world problem', 'problems that are not problems', 'white whine', 'not really a problem', 'invented problems', 'white people', 'problems'] },
    { id: '61527', name: 'Y U No', url: 'https://i.imgflip.com/1bh3.jpg', width: 500, height: 500, rate: 0, tags: ['catchphrase', 'y u no', 'rage guy', 'why you no', 'comic'] },
    { id: '61582', name: 'Creepy Condescending Wonka', url: 'https://i.imgflip.com/1bim.jpg', width: 550, height: 545, rate: 0, tags: ['creepy wondescending wonka', 'willy wonka', 'unimpressed', 'condescending', 'how interesting', 'interesante', 'do tell more', 'reaction image', 'movie'] },
    { id: '8072285', name: 'Doge', url: 'https://i.imgflip.com/4t0m5.jpg', width: 620, height: 620, rate: 0, tags: ['doge', 'animal', 'dog', 'shiba inu', 'shibe', 'such doge', 'super shibe', 'japanese', 'super', 'much', 'very', 'many', 'photoshop meme', 'such', 'shiba', 'shibe doge', 'doges', 'dogges', 'dogecoin', 'shitposting', 'stare', 'canine'] },
    { id: '61556', name: 'Grandma Finds The Internet', url: 'https://i.imgflip.com/1bhw.jpg', width: 640, height: 480, rate: 0, tags: ['grandma finds the internet', 'grandma meme', 'internet grandma surprise', 'noob', 'tech noob', 'naive', 'internet reference', 'tech support'] },
    { id: '1509839', name: 'Captain Picard Facepalm', url: 'https://i.imgflip.com/wczz.jpg', width: 500, height: 324, rate: 0, tags: ['captain picard facepalm', 'gesture', 'catch-phrase', 'disapproval', 'comments', 'jean luc picard', 'reaction image', 'star trek', 'face', 'facepalm', 'tv'] },
    { id: '61533', name: 'X All The Y', url: 'https://i.imgflip.com/1bh9.jpg', width: 500, height: 355, rate: 0, tags: ['x all the y', 'all the things', 'comic', 'best of 2011', 'exploitable'] },
    { id: '101511', name: 'Dont You Squidward', url: 'https://i.imgflip.com/26br.jpg', width: 500, height: 333, rate: 0, tags: ['dont you squidward', 'squidward', 'spongebob squarepants', 'you like krabby patties don’t you', 'tv'] },
    { id: '56225174', name: 'Be Like Bill', url: 'https://i.imgflip.com/xh3me.jpg', width: 913, height: 907, rate: 0, tags: ['be like bill', 'online behavior', 'selfie', 'intelligence', 'intelligente', 'inteligente', 'this is bill'] },
    { id: '61544', name: 'Success Kid', url: 'https://i.imgflip.com/1bhk.jpg', width: 500, height: 500, rate: 0, tags: ['success kid', 'kids', 'exploitable', 'baby', 'success', 'advice animal', 'sandcastles', 'victory baby'] },
    { id: '259680', name: 'Am I The Only One Around Here', url: 'https://i.imgflip.com/5kdc.jpg', width: 500, height: 348, rate: 0, tags: ['comment', 'advice animal', 'big lebowski', 'am i the only one around here', 'movie'] },
    { id: '101287', name: 'Third World Success Kid', url: 'https://i.imgflip.com/265j.jpg', width: 500, height: 500, rate: 0, tags: ['third world success kid', 'third world success', 'advice animal', 'commentary', 'third world', 'african baby'] },
    { id: '922147', name: 'Laughing Men In Suits', url: 'https://i.imgflip.com/jrj7.jpg', width: 500, height: 333, rate: 0, tags: ['laughing men in suits', 'and then i said', 'politics', 'caption', 'laugh', 'laughter', 'taxes', 'saying'] },
    { id: '444501', name: 'Maury Lie Detector', url: 'https://i.imgflip.com/9iz9.jpg', width: 381, height: 378, rate: 0, tags: ['maury lie detector', 'tv', 'maury', 'talk show', 'advice animal', 'lie detector', 'polygraph'] },
    { id: '109765', name: 'Ill Just Wait Here', url: 'https://i.imgflip.com/2cp1.jpg', width: 491, height: 550, rate: 0, tags: ['ill just wait here', 'slow internet', 'slow', 'waiting', 'waiting a long time', 'comments', 'reaction image',] },
    { id: '61581', name: 'Put It Somewhere Else Patrick', url: 'https://i.imgflip.com/1bil.jpg', width: 343, height: 604, rate: 0, tags: ['put it somewhere else patrick', 'star', 'push it somewhere else', 'patrick', 'tv', 'spongebob'] },
    { id: '40945639', name: 'Dr Evil Laser', url: 'https://i.imgflip.com/odluv.jpg', width: 500, height: 405, rate: 0, tags: ['dr evil laser', 'movie', 'dr evil air quotes', 'quote', 'phrase', 'rage comic', 'reaction image', 'austin powers', 'rage face', 'advice animal', 'dr evil', 'mike myers', 'the spy who shagged me', 'air quotes'] },
    { id: '100947', name: 'Matrix Morpheus', url: 'https://i.imgflip.com/25w3.jpg', width: 500, height: 303, rate: 0, tags: ['matrix morpheus', 'movie', 'advice animals', 'advice animals of 2012', 'advice animal', 'the matrix', 'what if i told you'] },
    { id: '9440985', name: 'Face You Make Robert Downey Jr', url: 'https://i.imgflip.com/5mcpl.jpg', width: 460, height: 523, rate: 0, tags: ['robert downey jr', 'face you make robert downey jr', 'movie', 'eye rolling robert downey jr', 'eye rolling', 'eye', 'rolling', 'the face you make', 'reaction'] },
    { id: '235589', name: 'Evil Toddler', url: 'https://i.imgflip.com/51s5.jpg', width: 500, height: 332, rate: 0, tags: ['evil toddler', 'evil', 'children', 'child', 'toddler', 'sinister toddler'] },
    { id: '14371066', name: 'Star Wars Yoda', url: 'https://i.imgflip.com/8k0sa.jpg', width: 620, height: 714, rate: 0, tags: ['star wars yoda', 'yodaspeak', 'movie', 'switcharoo', 'star wars', 'yoda'] },
    { id: '405658', name: 'Grumpy Cat', url: 'https://i.imgflip.com/8p0a.jpg', width: 500, height: 617, rate: 0, tags: ['grumpy cat', 'cat', 'disapproval', 'grumpy', 'this cat is not amused', 'exhibition', 'reaction', 'animal'] },
    { id: '61516', name: 'Philosoraptor', url: 'https://i.imgflip.com/1bgs.jpg', width: 500, height: 500, rate: 0, tags: ['philosoraptor', 'raptor', 'philosophy', 'advice dog'] },
    { id: '135678846', name: 'Who Killed Hannibal', url: 'https://i.imgflip.com/28s2gu.jpg', width: 1280, height: 1440, rate: 0, tags: ['who killed hannibal', 'tv', 'object labeling', 'eric andre show', 'hannibal burress'] },
    { id: '3218037', name: "This Is Where I'd Put My Trophy If IHad One", url: 'https://i.imgflip.com/1wz1x.jpg', width: 300, height: 418, rate: 0, tags: ["this is where i'd put my trophy if i had one", 'tv', 'angry', 'if i had one', 'fairly oddparents', 'trophy'] },
    { id: '99683372', name: 'Sleeping Shaq', url: 'https://i.imgflip.com/1nck6k.jpg', width: 640, height: 631, rate: 0, tags: ['sleeping shaq', 'shaq', 'sleeping', "shaquille o'neal", 'ascended', 'real shit', 'woke'] },
    { id: '61580', name: 'TooDamn High', url: 'https://i.imgflip.com/1bik.jpg', width: 420, height: 316, rate: 0, tags: ['toodamn high', 'too damn high', 'politics', 'debate', 'gubernatorial', 'speech', 'election', 'slogan', 'politician', 'pop culture', 'snowclone', 'phrasal template', 'occupy', 'the rent is too damn high', 'jimmy mcMillan'] },
    { id: '460541', name: 'Jack Sparrow Being Chased', url: 'https://i.imgflip.com/9vct.jpg', width: 500, height: 375, rate: 0, tags: ['Jack Sparrow Being Chased'] },
    // { id: '371382', name: 'Simba Shadowy Place', url: 'https://i.imgflip.com/7yk6.jpg', width: 363, height: 720, rate: 0, tags: [] },
    // { id: '6531067', name: 'See Nobody Cares', url: 'https://i.imgflip.com/3vzej.jpg', width: 620, height: 676, rate: 0, tags: [] },
    // { id: '21604248', name: 'Mugatu So Hot Right Now', url: 'https://i.imgflip.com/cv1y0.jpg', width: 620, height: 497, rate: 0, tags: [] },
    // { id: '12403754', name: 'Bad Pun Dog', url: 'https://i.imgflip.com/7dusq.jpg', width: 575, height: 1200, rate: 0, tags: [] },
    // { id: '28034788', name: 'Marvel Civil War 1', url: 'https://i.imgflip.com/govs4.jpg', width: 423, height: 734, rate: 0, tags: [] },
    // { id: '163573', name: 'Imagination Spongebob', url: 'https://i.imgflip.com/3i7p.jpg', width: 500, height: 366, rate: 0, tags: [] },
    // { id: '101716', name: 'Yo Dawg Heard You', url: 'https://i.imgflip.com/26hg.jpg', width: 500, height: 323, rate: 0, tags: [] },
    // { id: '89655', name: 'Uncle Sam', url: 'https://i.imgflip.com/1x6f.jpg', width: 620, height: 833, rate: 0, tags: [] },
    // { id: '47235368', name: 'Good Fellas Hilarious', url: 'https://i.imgflip.com/s4f1k.jpg', width: 1600, height: 1150, rate: 0, tags: [] },
    // { id: '74191766', name: 'Arthur Fist', url: 'https://i.imgflip.com/1866qe.jpg', width: 583, height: 328, rate: 0, tags: [] },
    // { id: '79367954', name: 'Blank Starter Pack', url: 'https://i.imgflip.com/1b94pe.jpg', width: 941, height: 960, rate: 0, tags: [] },
    // { id: '245898', name: 'Picard Wtf', url: 'https://i.imgflip.com/59qi.jpg', width: 500, height: 350, rate: 0, tags: [] },
    // { id: '156892', name: 'Inception', url: 'https://i.imgflip.com/3d24.jpg', width: 410, height: 668, rate: 0, tags: [] },
    // { id: '29617627', name: 'Look At Me', url: 'https://i.imgflip.com/hmt3v.jpg', width: 300, height: 300, rate: 0, tags: [] },
    // { id: '1232104', name: 'Pepperidge Farm Remembers', url: 'https://i.imgflip.com/qep4.jpg', width: 500, height: 500, rate: 0, tags: [] },
    // { id: '142921050', name: 'Car Salesman Slaps Roof Of Car', url: 'https://i.imgflip.com/2d3al6.jpg', width: 800, height: 450, rate: 0, tags: [] },
    // { id: '1790995', name: 'And everybody loses their minds', url: 'https://i.imgflip.com/12dxv.jpg', width: 620, height: 349, rate: 0, tags: [] },
    // { id: '100955', name: 'Confession Bear', url: 'https://i.imgflip.com/25wb.jpg', width: 460, height: 480, rate: 0, tags: [] },
    // { id: '61584', name: 'Socially Awesome Awkward Penguin', url: 'https://i.imgflip.com/1bio.jpg', width: 576, height: 577, rate: 0, tags: [] },
    // { id: '228024', name: 'Liam Neeson Taken', url: 'https://i.imgflip.com/4vy0.jpg', width: 300, height: 300, rate: 0, tags: [] },
    // { id: '61733537', name: 'Mr Krabs Blur Meme', url: 'https://i.imgflip.com/10r5wh.jpg', width: 708, height: 495, rate: 0, tags: [] },
    // { id: '124212', name: 'Say That Again I Dare You', url: 'https://i.imgflip.com/2nuc.jpg', width: 393, height: 330, rate: 0, tags: [] },
    // { id: '195389', name: 'Sparta Leonidas', url: 'https://i.imgflip.com/46rh.jpg', width: 500, height: 264, rate: 0, tags: [] },
    // { id: '19209570', name: 'What Do We Want', url: 'https://i.imgflip.com/bfq76.jpg', width: 480, height: 352, rate: 0, tags: [] },
    // { id: '7253945', name: 'Kevin Hart', url: 'https://i.imgflip.com/4bh6h.jpg', width: 560, height: 371, rate: 0, tags: [] },
    // { id: '412211', name: 'Jackie Chan WTF', url: 'https://i.imgflip.com/8u2b.jpg', width: 500, height: 375, rate: 0, tags: [] },
    // { id: '53764', name: 'Peter Parker Cry', url: 'https://i.imgflip.com/15hg.jpg', width: 400, height: 992, rate: 0, tags: [] },
    // { id: '176908', name: 'Shut Up And Take My Money Fry', url: 'https://i.imgflip.com/3si4.jpg', width: 500, height: 281, rate: 0, tags: [] },
    // { id: '17699', name: 'Buddy Christ', url: 'https://i.imgflip.com/dnn.jpg', width: 400, height: 400, rate: 0, tags: [] },
    // { id: '766986', name: 'Aaaaand Its Gone', url: 'https://i.imgflip.com/gft6.jpg', width: 500, height: 281, rate: 0, tags: [] },
    // { id: '101440', name: '10 Guy', url: 'https://i.imgflip.com/269s.jpg', width: 500, height: 454, rate: 0, tags: [] },
    // { id: '673439', name: 'Confused Gandalf', url: 'https://i.imgflip.com/efmn.jpg', width: 500, height: 607, rate: 0, tags: [] },
    // { id: '107773', name: 'Spiderman Peter Parker', url: 'https://i.imgflip.com/2b5p.jpg', width: 461, height: 352, rate: 0, tags: [] },
    // { id: '19194965', name: 'Star Wars No', url: 'https://i.imgflip.com/bfexh.jpg', width: 620, height: 665, rate: 0, tags: [] },
    // { id: '8279814', name: 'Cute Cat', url: 'https://i.imgflip.com/4xgqu.jpg', width: 480, height: 532, rate: 0, tags: [] }
];

function getMemes() {
    return gMemes;
}

function addMeme(meme) {
    gMemes.push(meme);
    saveToLocalStorage(MEMES_KEY, gMemes);
}