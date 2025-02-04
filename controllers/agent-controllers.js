const { propertySchema } = require("../validators/property");
const prisma = require("../configs/prisma");
const cloudinary = require("../configs/cloudinary");
const fs = require("fs")

exports.createProperty = async (req, res, next) => {
  try {
    const validatedData = await propertySchema.validateAsync(req.body);

    const { categoryId, provinceId, districtId, roadId, ...toCreateInputs } =
      validatedData;

    const toUploadPromise = req.files.map((el) =>
      cloudinary.uploader.upload(el.path)
    );

    const images = await Promise.all(toUploadPromise);

    const newProperty = await prisma.property.create({
      data: {
        ...toCreateInputs,
        agent: {
          connect: {
            id: req.user.id,
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
        province: {
          connect: {
            id: provinceId,
          },
        },
        district: {
          connect: {
            id: districtId,
          },
        },
        road: {
          connect: {
            id: roadId,
          },
        },
        propertyImages: {
          createMany: {
            data: images.map((el) => ({ imageUrl: el.secure_url })),
          },
        },
      },
      include: {
        propertyImages: true
      }
    });

    res.status(201).json({ property: newProperty });
  } catch (err) {
    next(err);
  } finally {
    if(req.files.length > 1) {
      for(let el of req.files) {
        fs.unlinkSync(el.path)
      }
    }
  }
};
