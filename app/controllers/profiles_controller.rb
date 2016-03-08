class ProfilesController < ApplicationController
   # form were user can fill out their own profile
   #look into dbase and getthe current logged in user
   def new
       @user = User.find( params[:user_id] )
       @profile = @user.build_profile
   end
end