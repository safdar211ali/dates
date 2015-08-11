module LetsgoHelper
  def letsgo_icon_class(letsgo)
    case letsgo.tag
    when "Eat/Drink"
      "fork27"
    when "Play"
      "play48"
    when "Listen/Watch"
      "entry"
    when "Explore"
      "binoculars18"
    when "Other"
      "calendar146"
  end
end

end