from app.models import db, Product, environment, SCHEMA


def seed_products():
    products = [
        {
            "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            "price": 109.95,
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "category": "Clothing, Shoes & Jewelry",
            "brand": "Wolf House",
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "owner_id": 7, "count": 120
        },
        {
            "title": "Mens Casual Premium Slim Fit T-Shirts ",
            "price": 22.3,
            "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
            "category": "Clothing, Shoes & Jewelry",
            "brand": "Shirt Company",
            "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
            "owner_id": 7, "count": 259
        },
        {
            "title": "Mens Cotton Jacket",
            "price": 55.99,
            "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
            "category": "Clothing, Shoes & Jewelry",
            "brand": "Shirt Company",
            "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
            "owner_id": 7, "count": 500
        },
        {
            "title": "Mens Casual Slim Fit",
            "price": 15.99,
            "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
            "category": "Clothing, Shoes & Jewelry",
            "brand": "Shirt Company",
            "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
            "owner_id": 7, "count": 430
        },
        {
            "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
            "price": 695,
            "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
            "category": "Clothing, Shoes & Jewelry",
            "brand": "Mountain Glow",
            "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
            "owner_id": 7, "count": 400
        },
        {
            "title": "Solid Gold Petite Micropave ",
            "price": 168,
            "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
            "category": "Clothing, Shoes & Jewelry",
            "brand": "Mountain Glow",
            "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
            "owner_id": 7, "count": 70
        },
        {
            "title": "White Gold Plated Princess",
            "price": 9.99,
            "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
            "category": "Clothing, Shoes & Jewelry",
            "brand": "Mountain Glow",
            "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
            "owner_id": 7, "count": 400
        },
        {
            "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
            "price": 10.99,
            "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
            "category": "Clothing, Shoes & Jewelry",
            "brand": "Mountain Glow",
            "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
            "owner_id": 7, "count": 100
        },
        {
            "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
            "price": 64,
            "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
            "category": "Electronics",
            "brand": "ElectroHut",
            "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
            "owner_id": 7, "count": 203
        },
        {
            "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
            "price": 109,
            "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
            "category": "Electronics",
            "brand": "ElectroHut",
            "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
            "owner_id": 7, "count": 470
        },
        {
            "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
            "price": 109,
            "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
            "category": "Electronics",
            "brand": "ElectroHut",
            "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
            "owner_id": 7, "count": 319
        },
        {
            "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
            "price": 114,
            "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
            "category": "Electronics",
            "brand": "ElectroHut",
            "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
            "owner_id": 7, "count": 400
        },
        {
            "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
            "price": 599,
            "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
            "category": "Electronics",
            "brand": "ElectroHut",
            "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
            "owner_id": 7, "count": 250
        },
        {
            "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
            "price": 999.99,
            "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
            "category": "Electronics",
            "brand": "ElectroHut",
            "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
            "owner_id": 7, "count": 140
        },
        {
            "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
            "price": 56.99,
            "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
            "category": "Clothing, Shoes & Jewelry",
            "brand": "Shirt Company",
            "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
            "owner_id": 7, "count": 235
        },
        {
            "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
            "price": 29.95,
            "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
            "category": "Clothing, Shoes & Jewelry",
            "brand": "Shirt Company",
            "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
            "owner_id": 7, "count": 340
        },
        {
            "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
            "price": 39.99,
            "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
            "category": "Clothing, Shoes & Jewelry",
            "brand": "Shirt Company",
            "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
            "owner_id": 7, "count": 679
        },
        {
            "title": "MBJ Women's Solid Short Sleeve Boat Neck V ",
            "price": 9.85,
            "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
            "category": "Clothing, Shoes & Jewelry",
            "brand": "Shirt Company",
            "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
            "owner_id": 7, "count": 130
        },
        {
            "title": "Opna Women's Short Sleeve Moisture",
            "price": 7.95,
            "description": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
            "category": "Clothing, Shoes & Jewelry",
            "brand": "Shirt Company",
            "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
            "owner_id": 7, "count": 146
        },
        {
            "title": "DANVOUY Womens T Shirt Casual Cotton Short",
            "price": 12.99,
            "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
            "category": "Clothing, Shoes & Jewelry",
            "brand": "Shirt Company",
            "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
            "owner_id": 7, "count": 145
        },
        {
            "title": "Lettuce - Sea / Sea Asparagus",
            "price": 20.64,
            "description": "Tender Green Asparagus Spears Thin Little Gourmet Salad Toppers Spicy Bloody Mary Recipe Ingredients Healthy Snacks",
            "category": "Groceries",
            "brand": "S-pone",
            "image": "https://m.media-amazon.com/images/I/71w5QLOqkCL._AC_SL1257_.jpg",
            "owner_id": 7, "count": 20
        },
        {
            "title": "Soup - Bumble Bee  - The Run Chipotle Chicken Salad with Crackers Kit",
            "price": 14.63,
            "description": "You do not need to stop at a big named burrito chain to get a quick chipotle chicken fix. A succulent chicken salad with a kick of chipotle, our Snack on the Run! Chipotle Chicken Salad kit is already mixed and ready to eat on the go — no prep required.",
            "category": "Groceries",
            "brand": "Bumble Bee",
            "image": "https://m.media-amazon.com/images/I/81Yff31G6oS._SL1500_.jpg",
            "owner_id": 7, "count": 34
        },
        {
            "title": "Purina - Digestive Health Large Breed Dry Dog Food, Chicken and Rice Formula",
            "price": 58.37,
            "description": "Provide for your puppy's nutritional needs with Purina Pro Plan Brand Dog Food Puppy Chicken and Rice Formula dry puppy food",
            "category": "Pet Supplies",
            "brand": "Digestive Health Large Breed Dry Dog Food, Chicken and Rice Formula",
            "image": "https://m.media-amazon.com/images/I/81fDDyMvhkL._AC_SL1500_.jpg",
            "owner_id": 7, "count": 15
        },
        {
            "title": "Beer - Sleeman Fine Porter",
            "price": 23.72,
            "description": "A most flavourful and truly satisfying brews of ale. This porter has a bold, malty taste and a rich, deep colour. Brewed from page 68 of John's great-great grandfather's recipe book, this is the first brew in the limited John Sleeman Presents series",
            "category": "Groceries",
            "brand": "Sleeman Fine Porter",
            "image": "https://products3.imgix.drizly.com/ci-sleeman-light-070be94284dbc51a.jpeg?auto=format%2Ccompress&ch=Width%2CDPR&fm=jpg&q=20",
            "owner_id": 7, "count": 45
        },
        {
            "title": "Nescafe - Frothy French Vanilla",
            "price": 61.34,
            "description": "Nescafe French Vanilla Cappuccino Mix is a consistent high quality, convenient powder format with a rich, sweet, frothy flavor. Treat yourself to a sweet, aromatic vanilla blended cappuccino blended with rich coffee flavors to create a delectable drink. Nescafe gives you great flavor, consistent quality, zero waste, less labor and friendly, responsive service. That is the total Nescafe solution. That is coffee, solved.",
            "category": "Groceries",
            "brand": "Nescafe",
            "image": "https://m.media-amazon.com/images/I/81jRbldvVbL._SL1500_.jpg",
            "owner_id": 7, "count": 98
        },
        {
            "title": "Beggin'- Purina Strips Bacon Dog Treats Made in USA Facilities Adult Dog Training Treats",
            "price": 20.22,
            "description": "Get your dog dancing with joy when you hand over Purina Beggin' Strips Original With Bacon adult dog treats. Our irresistible Beggin' bacon flavor jerky dog treats feature real meat as the first ingredient and offer the tantalizing taste of real bacon. ",
            "category": "Pet Supplies",
            "brand": "Beggin'",
            "image": "https://m.media-amazon.com/images/I/818Q+9mjDUL._AC_SL1500_.jpg",
            "owner_id": 7, "count": 102
        },
        {
            "title": "Friskies Purina -  Made in USA Facilities Cat Treats, Party Mix Beachside Crunch",
            "price": 18.46,
            "description": "ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis",
            "category": "Pet Supplies",
            "brand": "Purina",
            "image": "https://m.media-amazon.com/images/I/81yr9g90dqL._AC_SL1500_.jpg",
            "owner_id": 7, "count": 200
        },
        {
            "title": "Purina - Pro Plan Weight Control Dry Cat Food, Chicken and Rice Formula ",
            "price": 42.22,
            "description": "Help your cat thrive with Purina Pro Plan SPECIALIZED Weight Management Chicken and Rice Formula adult dry cat food. This weight control cat food is formulated with 43 percent protein to maintain her lean muscle mass during weight loss, and it contains 20 percent less fat than our Purina Pro Plan COMPLETE ESSENTIALS Adult Chicken and Rice formula to help her maintain a healthy weight. We formulate this Purina high-protein cat food with high-quality sources of protein, including real chicken as the first ingredient, and every high-quality ingredient is carefully selected for a specific purpose.",
            "category": "Pet Supplies",
            "brand": "Purina",
            "image": "https://m.media-amazon.com/images/I/71Nu7MkUEOL._AC_SL1500_.jpg",
            "owner_id": 7, "count": 98
        },
        {
            "title": "Gain - Aroma Boost Laundry Detergent Liquid Soap, Moonlight Breeze Scent",
            "price": 15.7,
            "description": "Whisk yourself away to a tropical paradise with the help of Gain Island Fresh Liquid Laundry Detergent! Take your nose on a sunnt vacation with the alluring scent of exotic fruits and flowers, wrapping your clothes in ahhhmazing freshness.",
            "category": "Health & Household",
            "brand": "Gain",
            "image": "https://m.media-amazon.com/images/I/81rff0UVJBL._AC_SL1500_.jpg",
            "owner_id": 7, "count": 54
        },
        {
            "title": "Charmin - Ultra Gentle Toilet Paper, 18 Mega Rolls = 72 Regular Rolls",
            "price": 23.12,
            "description": "nlike ordinary toilet paper that can irritate in use, Charmin Ultra Gentle is dermatologist-tested to gently clean even irritated skinch That is because Charmin Ultra Gentle toilet paper has the Charmin softness you love with a touch of soothing lotion.",
            "category": "Health & Household",
            "brand": "Charmin",
            "image": "https://m.media-amazon.com/images/I/81lm8f9Y5tL._AC_SL1500_.jpg",
            "owner_id": 7, "count": 22
        },
        {
            "title": "Pampers- Diapers Newborn/Size 1 (8-14 lb), 32 Count - Pampers Pure Protection Disposable Baby Diapers",
            "price": 9.51,
            "description": "Your search for pure protection that works is over! Designed to help skin stay dry and healthy, Pampers Pure Protection diapers lock wetness away from skin for up to 12 hours for outstanding leakage protection with skin-loving care.",
            "category": "Health & Household",
            "brand": "Pampers",
            "image": "https://m.media-amazon.com/images/I/61HV4bi3EFL._AC_SL1500_.jpg",
            "owner_id": 7, "count": 10
        },
        {
            "title": "Tylenol- Extra Strength Caplets with 500 mg Acetaminophen, Pain Reliever & Fever Reducer",
            "price": 13.62,
            "description": "Tylenol Extra Strength caplets with 500mg of acetaminophen reduce fever and provide temporary relief of minor aches and pains. From the #1 doctor-recommended brand of pain reliever, each caplet contains 500 mg of acetaminophen for effective, extra strength pain relief. Both a fever reducer and pain reliever, it relieves minor aches and pains due to headache, backache, toothache, minor pain of arthritis, the common cold, and premenstrual and menstrual cramps.",
            "category": "Health & Household",
            "brand": "Tylenol",
            "image": "https://m.media-amazon.com/images/I/71Psf+JrdQL._AC_SL1500_.jpg",
            "owner_id": 7, "count": 76
        },
        {
            "title": "Bell & Evans - Bone In Split Chicken Breast",
            "price": 22.37,
            "description": "Bell & Evans, Chicken Breast Bone-In Split Air Chilled Tray Pack Value Pack Step 2",
            "category": "Groceries",
            "brand": "Bell & Evans",
            "image": "https://m.media-amazon.com/images/I/81t7Rarmt3L._SL1500_.jpg",
            "owner_id": 7, "count": 55
        },
        {
            "title": "7UP - Diet Lemon Lime Soda, Naturally Flavored, Zero Calories and Caffeine Free, 12 Fl Oz (pack of 8)",
            "price": 20.02,
            "description": "Diet 7UP is now 7UP Zero Sugar! Feel refreshed by the balanced taste of 7UP Zero Sugar, made with the same crisp, iconic Lemon Lime flavors as Diet. 7UP is a fantastic drink on its own and is also a perfect addition to meals and recipes for any occasion. ",
            "category": "Groceries",
            "brand": "7UP",
            "image": "https://m.media-amazon.com/images/I/81yAJk9YdUL._SL1500_.jpg",
            "owner_id": 7, "count": 300
        },
        {
            "title": "Orangina - French Imported Orange Pulp Soda Tall Cans (12 Pack, Total of 138oz)",
            "price": 6.16,
            "description": "Orangina is a lightly carbonated beverage made from carbonated water, 12% citrus juice (10% from concentrated orange, 2% from a combination of concentrated lemon, concentrated mandarin, and concentrated grapefruit juices), as well as 2% orange pulp. Orangina is sweetened with sugar or high fructose corn syrup (glucose fructose) and natural flavors are added.",
            "category": "Groceries",
            "brand": "Orangina",
            "image": "https://m.media-amazon.com/images/I/71w-UeHBjjS._SL1500_.jpg",
            "owner_id": 7, "count": 18
        },
        {
            "title": "Post- Honey Bunches of Oats with Almonds, Heart Healthy, Low Fat, made with Whole Grain Cereal, 18 Ounce Box",
            "price": 4.48,
            "description": "Win your morning with a bowl of Honey Bunches of Oats with Almonds cereal. Honey Bunches of Oats with Almonds is packed with 14 grams of whole grains per serving, is a good source of Vitamin D, and Zinc, and is high in vitamins B6 and folate. This heart healthy cereal is the right choice for every pantry. No need to compromise on flavor or nutrition when you have a perfect trio of crispy flakes, crunchy oat bunches, and sliced almonds. Start your day off right with Honey Bunches of Oats with Almonds cereal.",
            "category": "Groceries",
            "brand": "Post",
            "image": "https://m.media-amazon.com/images/I/81q6yl0jLkL._SL1500_.jpg",
            "owner_id": 7, "count": 65
        },
        {
            "title": "The Complete Human Body, 2nd Edition: The Definitive Visual Guide",
            "price": 10.9,
            "description": "The extraordinary detail of these pictures will give students an excellent understanding of the body's structure and organization",
            "category": "Books",
            "brand": "Dr. Alice Roberts",
            "image": "https://m.media-amazon.com/images/I/91TtYBEH9hL.jpg",
            "owner_id": 7, "count": 43
        },
        {
            "title": "Storyworthy: Engage, Teach, Persuade, and Change Your Life through the Power of Storytelling Paperback",
            "price": 16.23,
            "description": "interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at",
            "category": "Books",
            "brand": "Matthew Dicks",
            "image": "https://m.media-amazon.com/images/I/71psHRXrnqL.jpg",
            "owner_id": 7, "count": 104
        },
        {
            "title": "So Good They Can't Ignore You Paperback",
            "price": 19.57,
            "description": "Autonomy: the feeling that you have control over your day, and that your actions are important Competence: the feeling that you are good at what you do Relatedness: the feeling of connection to other people",
            "category": "Books",
            "brand": "Cal Newport",
            "image": "https://m.media-amazon.com/images/I/41T9ornqs5L.jpg",
            "owner_id": 7, "count": 23
        },
        {
            "title": "Make Time: How to Focus on What Matters Every Day Hardcover",
            "price": 20.87,
            "description": "Perfection is a distraction—another shiny object taking your attention away from your real priorities.",
            "category": "Books",
            "brand": "John Zeratsky, Jake Knapp",
            "image": "https://m.media-amazon.com/images/I/81LXfBoLlCL.jpg",
            "owner_id": 7, "count": 145
        },
        {
            "title": "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones Hardcover",
            "price": 19.04,
            "description": "Goals are about the results you want to achieve. Systems are about the processes that lead to those results.",
            "category": "Books",
            "brand": "James Clear",
            "image": "https://m.media-amazon.com/images/I/81wgcld4wxL.jpg",
            "owner_id": 7, "count": 87
        },
        {
            "title": "Tropicana- Cranberry Cocktail Juice, 10 Ounce (Pack of 24)",
            "price": 18.34,
            "description": "Now you can enjoy the refreshing taste of Tropicana Cranberry Juice Beverage anytime, anywhere with these convenient 10 oz. bottles. Its the perfect blend of both tart and sweet, creating a flavor you will love. And it contains 100% of your days supply of vitamin C, an important antioxidant that helps support a healthy immune system. Tropicana Cranberry juice drink is the perfect combination of taste and nutrition. Best of all, you can get this twenty-four (24) count juice pack delivered straight to your door, so you and your family can enjoy Tropicana Cranberry Juice Beverage anytime you want.",
            "category": "Groceries",
            "brand": "Tropicana",
            "image": "https://m.media-amazon.com/images/I/81w5zqdYpeL._SL1500_.jpg",
            "owner_id": 7, "count": 77
        },
        {
            "title": "Metene - Shower Brush with Soft and Stiff Bristles, Bath Dual-Sided Long Handle Back Scrubber Body Exfoliator for Wet or Dry Brushing",
            "price": 9.09,
            "description": "Metene Shower Brush with Soft and Stiff Bristles ,for Exfoliating Skin and A Soft Scrub ,Double-sided Brush Head for Wet or Dry Brushing ,Specially Long Wooden Handle Cleans the Body Easily",
            "category": "Beauty & Personal Care",
            "brand": "Metene",
            "image": "https://m.media-amazon.com/images/I/61gHENr6geS._AC_SL1500_.jpg",
            "owner_id": 7, "count": 27
        },
        {
            "title": "Pepperidge Farm - Trio Variety Crackers, 10 oz. Box",
            "price": 10.15,
            "description": "Entertaining is easy with Pepperidge Farm crackers! The delicious flavors of our Golden Butter, Harvest Wheat, and Classic Water crackers go well with any of your favorite toppings. Our Golden Butter crackers are deliciously buttery, Hearty Wheat crackers have a touch of sweetness, and Classic Water crackers are perfect for letting your toppings shine.",
            "category": "Groceries",
            "brand": "Pepperidge Farm",
            "image": "https://m.media-amazon.com/images/I/81Pqvqfo8CL._SL1500_.jpg",
            "owner_id": 7, "count": 187
        },
        {
            "title": "A Simple Guide For New Yoga Teachers: Complete With Tips, Poses, and Outlines For Planning Classes Paperback",
            "price": 29.09,
            "description": "A Simple Guide for Yoga Teachers is an easy-to-follow, informative book for any new teacher starting out. It is a must-have visual guide that includes poses to learn & master, helps you learn how to create a solid wireframe for all classes, and includes images of poses with in-depth anatomical details of their purpose.",
            "category": "Books",
            "brand": "Nina Hunt",
            "image": "https://m.media-amazon.com/images/I/61-dqBMLoYL.jpg",
            "owner_id": 7, "count": 23
        },
        {
            "title": "LETSQK - Dog Coat, Waterproof and Windproof Dog Jacket, Reflective Safety Dog Vest, Thick Padded Warm Comfortable",
            "price": 24.38,
            "description": "New Dog coat outer adopted with the professional outdoor fabric, it's waterproof, windproof, and breathable.",
            "category": "Pet Supplies",
            "brand": "LETSQK",
            "image": "https://m.media-amazon.com/images/I/61PJA8Nt8LL._AC_SL1500_.jpg",
            "owner_id": 7, "count": 64
        },
        {
            "title": "First Aid Only - 298 Piece All-Purpose First Aid Emergency Kit",
            "price": 21.77,
            "description": "First Aid Only emergency first aid kit prepares you for tackling immediate minor injuries. The 298 piece kit has supplies for pain and swelling, as well as for cuts, scrapes, and burns. This bag is easy to carry and compact, measuring 9.25 x 2.875 x 7 inches, with compartments to store everything. Ideal for home, traveling and on the go. Take care of those minor scrapes anywhere with this first aid kit.",
            "category": "Health & Household",
            "brand": "First Aid Only",
            "image": "https://m.media-amazon.com/images/I/612v2BWjs3L._SL1500_.jpg",
            "owner_id": 7, "count": 92
        },
        {
            "title": "Nintendo Switch™ with Neon Blue and Neon Red Joy/Con",
            "price": 299.24,
            "description": "he console itself is a tablet that can either be docked for use as a home console or used as a portable device, making it a hybrid console.",
            "category": "Video Games",
            "brand": "Nintendo",
            "image": "https://m.media-amazon.com/images/I/61nfFrm5NcL._AC_SL1500_.jpg",
            "owner_id": 7, "count": 100
        },
        {
            "title": "PlayStation PS5 Console God of War Ragnarök Bundle",
            "price": 540.29,
            "description": "From Santa Monica Studio comes the sequel to the critically acclaimed God of War (2018). Join Kratos and Atreus on a mythic journey for answers before Ragnarök arrives. Together, father and son must put everything on the line as they journey to each of the Nine Realms. ",
            "category": "Video Games",
            "brand": "Sony",
            "image": "https://m.media-amazon.com/images/I/61SUJDrCTLL._SL1500_.jpg",
            "owner_id": 7, "count": 509
        },
        {
            "title": "Fire Emblem Engage - Nintendo Switch",
            "price": 57.01,
            "description": "Use hero-summoning strategies to defeat an ancient threat in a brand-new Fire Emblem game",
            "category": "Video Games",
            "brand": "Nintendo",
            "image": "https://m.media-amazon.com/images/I/81JJ-9rB0vL._SL1500_.jpg",
            "owner_id": 7, "count": 110
        },
        {
            "title": "Pokémon Scarlet - Nintendo Switch",
            "price": 49.39,
            "description": "Pokémon in the Paldea region have the ability to Terastallize to gain special power. When a Pokémon Terastallizes, a Tera Jewel appears above its head like a crown, and the Pokémons body glistens like a cut gemstone. Each Pokémon has a Tera Type that remains inactive until the Pokémon Terastallizes. For example, most Eevee will have a Normal Tera Type, but some other Eevee have a Flying Tera Type! When a Terastallized Pokémon uses a move that matches its Tera Type and at least one of its original types, the boost to that moves power will be even greater! Terastallizing holds the key to victory or defeat in battles in the Paldea region.",
            "category": "Video Games",
            "brand": "Nintendo",
            "image": "https://m.media-amazon.com/images/I/81EyjDeArUL._SL1500_.jpg",
            "owner_id": 7, "count": 62
        },
        {
            "title": "Logitech G735 Wireless Gaming Headset, Customizable LIGHTSYNC RGB Lighting, Bluetooth, 3.5 MM Aux",
            "price": 172.34,
            "description": "Unmatched Fit: Wireless gaming headset with intentional design to fit all gamers inclusive of people with smaller head sizes and those who wear glasses or small earrings",
            "category": "Electronics",
            "brand": "Logitech",
            "image": "https://m.media-amazon.com/images/I/61gnGTGkPkL._AC_SL1500_.jpg",
            "owner_id": 7, "count": 145
        },
        {
            "title": "2K - Mafia: Trilogy - Steam PC",
            "price": 60.58,
            "description": "Re-made from the ground up, rise through the ranks of the mafia during the Prohibition-era. After an inadvertent brush with the mob, Tommy Angelo is reluctantly thrust into the world of organized crime. Initially uneasy about falling in with the Salieri family, the rewards become too big to ignore.",
            "category": "Video Games",
            "brand": "2K",
            "image": "https://m.media-amazon.com/images/I/81t5iIkpXxL._SL1500_.jpg",
            "owner_id": 7, "count": 151
        },
        {
            "title": "Battlefield 2042 - Steam PC",
            "price": 21.45,
            "description": "Battlefield 2042 is a first-person shooter that marks the return to the iconic all-out warfare of the franchise. In a near-future world transformed by disorder, adapt and overcome dynamically-changing battlegrounds with the help of your squad and a cutting-edge arsenal.With support for 128 players, Battlefield 2042 brings unprecedented scale on vast battlegrounds across the globe.",
            "category": "Video Games",
            "brand": "Electronic Arts",
            "image": "https://m.media-amazon.com/images/I/71QQb8slaiS._SL1302_.jpg",
            "owner_id": 7, "count": 82
        },
        {
            "title": "The Sims 4 - Luxury Party Stuff - Origin PC",
            "price": 10.4,
            "description": "Add fun and elegant pieces to your Sims home, then invite the whole neighborhood over for a great time. Dress to impress.",
            "category": "Video Games",
            "brand": "Electronic Arts",
            "image": "https://m.media-amazon.com/images/I/81qUdMrX-HL._SL1500_.jpg",
            "owner_id": 7, "count": 84
        },
        {
            "title": "LAURA GELLER NEW YORK - 2022 Annual Party in a Palette Set of 4 Curated Full Face Makeup Palettes",
            "price": 33.48,
            "description": "CREAMY BLENDABLE FORMULA: Got some glamorous gatherings on your calendar this season? Turn up the beauty with this Party in a Palette! Our set of four face and eyeshadow palettes includes everything you need for a flawless full face.",
            "category": "Beauty & Personal Care",
            "brand": "LAURA GELLER NEW YORK",
            "image": "https://m.media-amazon.com/images/I/714du3GpyGL._SL1500_.jpg",
            "owner_id": 7, "count": 34
        },
        {
            "title": "CeraVe - Moisturizing Cream | Body and Face Moisturizer for Dry Skin",
            "price": 18.93,
            "description": "HYALURONIC ACID MOISTURIZER With hyaluronic acid, ceramides and MVE technology for 24 hour hydration. Rich, velvety texture that leaves skin feeling smooth, it is absorbed quickly for softened skin without greasy, sticky, feel.",
            "category": "Beauty & Personal Care",
            "brand": "CeraVe",
            "image": "https://m.media-amazon.com/images/I/61pP5gObVXL._SL1000_.jpg",
            "owner_id": 7, "count": 69
        },
        {
            "title": "Burt's Bees Lip Balm, Moisturizing Lip Care, 100% Natural, Original Beeswax with Vitamin E",
            "price": 9.95,
            "description": "Burts Bees lip balm nourishes and makes your lips feel luxurious. Infused with power packed Beeswax and antioxidant Vitamin E to condition skin and richly moisturize and soften lips, this lip balm nourishes dry lips while keeping them revitalized and hydrated. With a matte finish and moisturizing balm texture, the Original Beeswax lip balm glides on smoothly with a hint of Peppermint Oil that leaves your lips with a refreshing tingle.",
            "category": "Health & Household",
            "brand": "Burts",
            "image": "https://m.media-amazon.com/images/I/81gl-3aulYL._SL1500_.jpg",
            "owner_id": 7, "count": 453
        },
        {
            "title": "Nautica - Voyage Eau De Toilette for Men - Fresh, Romantic, Fruity Scent - Woody, Aquatic Notes of Apple",
            "price": 19.91,
            "description": "A blend of apple and water lotus laid on a woody base, combined of cedarwood, musk, and amber.",
            "category": "Health & Household",
            "brand": "Nautica",
            "image": "https://m.media-amazon.com/images/I/61gm2yDGyyL._SL1500_.jpg",
            "owner_id": 7, "count": 156
        },
        {
            "title": "Philips Norelco - OneBlade Hybrid Electric Trimmer and Shaver",
            "price": 36.94,
            "description": "The Philips Norelco OneBlade is a revolutionary new electric grooming technology designed for men who wear facial styles, beards, or stubble. OneBlade trims, edges, and shaves any length of hair. The unique OneBlade shaving technology integrates a fast moving cutter (200x per second) with a dual protection system to give you an efficient comfortable shave on longer hairs. ",
            "category": "Health & Household",
            "brand": "Philips Norelco",
            "image": "https://m.media-amazon.com/images/I/61ST2yRX2VL._SL1500_.jpg",
            "owner_id": 7, "count": 145
        }
    ]

    db.session.add_all([Product(**product)for product in products])
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()