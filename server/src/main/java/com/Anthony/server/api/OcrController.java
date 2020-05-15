package com.Anthony.server.api;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.awt.image.BufferedImageOp;
import java.awt.image.ConvolveOp;
import java.awt.image.Kernel;
import java.awt.image.RescaleOp;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.imageio.ImageIO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.Anthony.server.model.*;
import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

@RestController
public class OcrController {

	@PostMapping("/api/ocr")
	public String DoOCR(@RequestParam("Image")  MultipartFile image) throws IOException {
        //only english
        String destinationLanguage;
        destinationLanguage = "eng";
        System.out.println(destinationLanguage);

        
		OcrModel request = new OcrModel();
		request.setDestinationLanguage(destinationLanguage);
		request.setImage(image);

		ITesseract instance = new Tesseract();

		try {
            System.out.println("here");
            System.out.println("here");
            System.out.println("here");
            System.out.println("here");
            System.out.println("here");


			BufferedImage in = ImageIO.read(convert(image));
            System.out.println("height: " + in.getHeight());
            System.out.println("width: " + in.getWidth());

            BufferedImage newImage = convertToGrayScale(in);

            //contrast increase
            RescaleOp rescaleOp = new RescaleOp(1.2f, -10, null);
            rescaleOp.filter(newImage, newImage);

            newImage = sharpen(newImage);

            File outputfile = new File("sharpenedandcontrastimg.jpg");
            ImageIO.write(newImage, "jpg", outputfile);
            
			instance.setLanguage(request.getDestinationLanguage());
			instance.setDatapath("./tessdata");

            String result = instance.doOCR(newImage);
            
			return result;

		} catch (TesseractException | IOException e) {
			System.err.println(e.getMessage());
			return "Error while reading image";
		}

    }
    
    //use a spatial filtering with this mask to sharpen image and decrease noise
    public static BufferedImage sharpen(BufferedImage image){
        Kernel kernel = new Kernel(3, 3, new float[] { -1, -1, -1, -1, 9, -1, -1,
            -1, -1 });
        BufferedImageOp op = new ConvolveOp(kernel);
        image = op.filter(image, null);
        System.out.println("sharpened");
        return image;
    }
    
    //turn the image grayscale to decrease noise
    public static BufferedImage convertToGrayScale(BufferedImage image) {
        BufferedImage result = new BufferedImage(
                  image.getWidth(),
                  image.getHeight(),
                  BufferedImage.TYPE_BYTE_GRAY);
        Graphics g = result.getGraphics();
        g.drawImage(image, 0, 0, null);
        g.dispose();
        return result;
      }
	
	public static File convert(MultipartFile file) throws IOException {

        File convFile = new File("filename");
        System.out.println(convFile.getName());

        
        
        convFile.createNewFile();

        FileOutputStream fos = new FileOutputStream(convFile);
        System.out.println("after fox");

        System.out.println(file.getBytes());
        System.out.println("fk");

        fos.write(file.getBytes());
    
        System.out.println("return fox");
        fos.close();

	    return convFile;
	}
	
	
	   


}