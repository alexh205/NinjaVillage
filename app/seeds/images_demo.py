from app.models import db, Image, environment, SCHEMA


def seed_images():
    images = [
        {"url": "https://media.istockphoto.com/id/503157860/photo/enjoying-the-fresh-air.jpg?s=612x612&w=0&k=20&c=7nYcClKuS-u0hr98OxS3LSBz3Pia_83RZ4XHf0wC1Uo=",
            "owner_id": 1, "product_id": 1, "review_id": None},
        {"url": "https://media.istockphoto.com/id/501570208/photo/enjoying-a-solitary-walk.jpg?s=612x612&w=0&k=20&c=LtEGQmX1AWom4B7N9ruOqRyY7toFG4pLdJDyLizBVLA=",
            "owner_id": 1, "product_id": 1, "review_id": None},
        {"url": "https://media.istockphoto.com/id/1221635484/vector/mens-white-short-sleeve-t-shirt-design-templates-vector-illustration.jpg?s=612x612&w=0&k=20&c=Yr-4WlsM9RIKDrJws-tPSWnw2QmBsMjbjn3cV8ysksk=",
         "owner_id": 3, "product_id": 2, "review_id": None},
        {"url": "https://media.istockphoto.com/id/907605102/photo/handsome-man.jpg?s=612x612&w=0&k=20&c=yuSrrY2-SfDFT3T4YkDmzqA7Y8Iy1_HxSzagZqmsbp0=",
         "owner_id": 3, "product_id": 2, "review_id": None},
        {"url": "https://media.istockphoto.com/id/1208588875/photo/portrait-of-man-wearing-smart-casual-clothes-posing-sitting-on-chair.jpg?s=612x612&w=0&k=20&c=V5UjrUJJ_VFwAS5eQfeFdJmd_NXivtSBf_0JyrjfVuY=",
         "owner_id": 2,	"product_id": 3,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/170900420/photo/handsome-business-man.jpg?s=612x612&w=0&k=20&c=gXSmpXclr5IV69n2ImHLsf3_OZtcy46ba1B26TVeqMA=",
         "owner_id": 2,	"product_id": 3,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/946103052/photo/blue-longsleeve-cotton-tshirt-on-a-mannequin-isolated.jpg?s=612x612&w=0&k=20&c=AyrxjKK7ZRl6CDRolLX-LXcVn7I-cg2E_QdMarPTqh4=",
         "owner_id": 3,	"product_id": 4,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/1438991153/photo/mens-round-neck-full-sleeves-t-shirt.jpg?s=612x612&w=0&k=20&c=xd0xRiin809ff5WEpHG9FrrHk1BjLJZ_BvgloMPEpB0=",
         "owner_id": 3,	"product_id": 4,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/488548346/photo/gold-rings.jpg?s=612x612&w=0&k=20&c=ZQcQLYF4Eb4ETWAAOEIQdEgY67JsSYg1WbarKIoqblA=",
         "owner_id": 2,	"product_id": 6,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/974377836/photo/3d-illustration-gold-and-silver-engagement-wedding-band-ring-with-curve-out-ornament-and-red.jpg?s=612x612&w=0&k=20&c=vDXPVmXYHNlY3zy42rpXVxMI8cOzV8OHQPd-qC5VR1w=",
         "owner_id": 2,	"product_id": 6,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/1257680640/photo/first-aid-kit.jpg?s=612x612&w=0&k=20&c=h6W-rqxsBEIm6ijhL6bdVrkvJSXkBdgdjTiQAXROmDc=",
         "owner_id": 2,	"product_id": 47,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/169977713/photo/boys-with-a-tablet-computer.jpg?s=612x612&w=0&k=20&c=SfCX3E3Zzrw1tIMYi4xTiVaKAIN_rSKbUi7RsayswGo=",
         "owner_id": 2,	"product_id": 48,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/1227383211/photo/african-american-mans-portrait-isolated-on-gradient-studio-background-in-neon-light.jpg?s=612x612&w=0&k=20&c=T-HBlhxDMIU5OCKvWuMlAifK7s0iDZAgnc5JgKvebI4=",
         "owner_id": 2,	"product_id": 48,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/533460435/photo/ps4-controller.jpg?s=612x612&w=0&k=20&c=tlt3Sm7FQxGBaZSwZB8QqrY0VBsSisCRvIId-Hj1abw=",
         "owner_id": 2,	"product_id": 49,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/458095137/photo/play-death-rally-on-apple-ipad2.jpg?s=612x612&w=0&k=20&c=u2R3zeSBSqBd_9dQ2Oxhpn78TARZBBTMtvNr8t4glqk=",
         "owner_id": 2,	"product_id": 50,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/1002113928/photo/family-using-technology-at-home.jpg?s=612x612&w=0&k=20&c=PZ2YnhPmqKkLIH0g_Z-2tptvrNcQo3FetZKPbwgex8s=",
         "owner_id": 2,	"product_id": 50,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/890646638/photo/cosplayer-dressed-as-pokemon-character.jpg?s=612x612&w=0&k=20&c=k62xv_C5gkvjhDZQl1XoFr30dlIkrlTqnBAN9_NPygQ=",
         "owner_id": 2,	"product_id": 51,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/584759832/photo/playing-pokemon-go.jpg?s=612x612&w=0&k=20&c=qEHXdQGzcUddLtui0_anSxZz2HUXAGTF2ScYxVhMfJw=",
         "owner_id": 2,	"product_id": 51,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/910131604/photo/white-headphones-isolated.jpg?s=612x612&w=0&k=20&c=CzHaj80HRxNNw-z0yago0tk8J_DDphcjBa0MsR7FkQ4=",
         "owner_id": 1,	"product_id": 52,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/654573204/vector/%C3%B0%C3%B0%C2%B5%C3%B1%C3%B0%C3%B1%C3%B1.jpg?s=612x612&w=0&k=20&c=v8rqwbNiWSRQfwc6pkOQSLy2PSlyP0JeRgH5qXL3s2I=",
         "owner_id": 3,	"product_id": 53,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/1198321891/photo/italian-mafia-gangster.jpg?s=612x612&w=0&k=20&c=aeKlR6oVT_NTXISumQJhrj8Ns2172KEkTZ2jL1xbVok=",
         "owner_id": 3,	"product_id": 53,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/1170503452/photo/detective-board-with-photos-of-suspected-criminals-crime-scenes-and-evidence-with-red-threads.jpg?s=612x612&w=0&k=20&c=b-UTVIx6b_pA0eZTsMpG0FZwLSYwDHbwtHYVGRJ3ZgE=",
         "owner_id": 3,	"product_id": 53,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/1073717646/vector/business-team-professional-workers-happy-partners-group-team-building-office-male-and-female.jpg?s=612x612&w=0&k=20&c=4x3up-wKAJ2-MRqGikys4yyybi3OqR6IUZ1MLtXNpf0=",
         "owner_id": 3,	"product_id": 55,	"review_id": None},
        {"url": "https://media.istockphoto.com/id/174477864/photo/face-cream-with-cap-off.jpg?s=612x612&w=0&k=20&c=gRVGUbue429hXP8cUppZn6Iu8UzKDnSgOCgt3x8-1mQ=",
         "owner_id": 2,	"product_id": 57,	"review_id": None},
    ]

    db.session.add_all([Image(**image)for image in images])
    db.session.commit()


def undo_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")

    db.session.commit()
