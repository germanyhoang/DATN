// backend/src/controllers/bannerController.js
import Banner from "../../models/admin/banner";

export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByIdAndUpdate(id, req.body, { new: true });
    res.json(banner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listBanner = async (request, response) => {
  try {
      const banner = await Banner.find().exec()
      return response.json(
        banner
      )

  } catch (error) {
      return response.status(400).json({
          success: false,
          message: "Không tìm thấy dữ liệu" 
      })
  }
}

export const createBanner = async (req, res) => {
  try {
      const banner = await new Banner(req.body).save();
      res.json(banner)    
  } catch (error) {
      res.status(400).json({
          message: "không thể tạo banner"
      })
  }
}

export const readBanner = async (req ,res) =>{
  const filter = { _id: req.params.id}
  try {
      const banner = await Banner.findOne(filter);
      res.json(banner)
  } catch (error) {
      res.status(400).json({
          message: "không tìm thấy banner này"
      })
  }
}