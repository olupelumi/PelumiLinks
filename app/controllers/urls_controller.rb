class UrlsController < ApplicationController
    def index
        @urls = Url.all 
        render json: @urls
    end

    def show
        @url = Url.find_by(shortcut: params[:shortcut])
        redirect_to "https://www." + @url.long_url, allow_other_host: true
    end

    def create 
        @url = Url.new(shortcut: params[:shortcut], long_url: params[:long_url])
        if @url.save
            render json: Url.all
        else
            render json: {error: "Error creating a new url redirect"}
        end 

    end 

    def update
        @url = Url.find_by(shortcut: params[:shortcut])
        @url.update(long_url: params[:long_url])
       # I initially said the response here should return all the mappings but I think it's better to have it show the updated mapping. 
       # TODO: Update the design
       # TODO Add some try catch or something here for updating. What if the shortcut doesn't exist
        render json: @url 
    end 

    def destroy
        @url = Url.destroy_by(shortcut: params[:shortcut])
        render json: Url.all
    end
end
