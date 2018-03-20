import Email from '../controllers/Email/'

export default (req, res) => {
  res.send(Email.preview(req))
}
