Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, "493696170783447", "8081e4b7732938c3816173eeb7f93e3d", {:scope => 'user_about_me, publish_actions, manage_pages'}
end
