import Career from "../../models/admin/career"
import post from "../../models/post"

export const getCareers = async (req, res) => {
    try {
        const careers = await Career.find().exec()
        res.json(careers)
    } catch (error) {
        res.status(400).json({
            message: "Không có dữ liệu"
        })
    }
}

export const addCareer = async (req, res) => {
  try {
    const career = await new Career(req.body).save();
    res.json(career);
  } catch (error) {
    res.status(400).json({
      message: "không thêm được",
    });
  }
};

export const removeCareer = async (req, res) => {
    const id = req.params.id;
  
    try {
      // Find the career to be deleted
      const deletedCareer = await Career.findById(id);
  
      if (!deletedCareer) {
        return res.status(404).json({ message: 'Ngành nghề không tồn tại' });
      }
  
      // Find the "Other" career
      const otherCareer = await Career.findOne({ name: 'Khác' });
  
      if (!otherCareer) {
        return res.status(500).json({ message: 'Không thể tìm thấy ngành nghề "Other"' });
      }
  
      // Update jobs with the deleted career to "Other"
      await post.updateMany({ career: id }, { career: otherCareer._id });
  
      // Delete the career
      const deletedCareerDoc = await Career.findByIdAndDelete(id);
  
      res.status(200).json(deletedCareerDoc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  };

export const searchCareer = async (req, res) => {
  const key = req.query.q ? req.query.q : "";
  try {
    const newCareer = await Career.filter((item) => {
      return item.job_name.toLowerCase().indexOf(key.toLowerCase()) !== -1;
    });
    res
      .render("index", {
        careers: newCareer,
      })
      .json();
  } catch (error) {
    res.status(404).json({
      message: "Không tìm thấy",
    });
  }
};

export const editCareer = async (req, res) => {
  const id = { _id: req.params.id };
  try {
    const career = await Career.findOneAndUpdate(id, req.body, { new: true });
    res.json(career);
  } catch (error) {
    res.status(400).json({
      message: "Không thể cập nhật",
    });
  }
};

export const count = async (req, res) => {
  const { careerId } = req.body;
  const posts = await Post.find().exec();
  const data = posts.filter((post) => post.career === careerId);
  return res.json(data);
};
