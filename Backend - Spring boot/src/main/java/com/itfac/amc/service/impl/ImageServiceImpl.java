package com.itfac.amc.service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.azure.storage.blob.BlobClientBuilder;
import com.itfac.amc.service.ImageService;

@Service
public class ImageServiceImpl implements ImageService {

	@Autowired
	BlobClientBuilder client;

	public ResponseEntity<String> uploadToLocalFileSystem(MultipartFile file) {
		if (file != null) {
			try {
				String fileName = StringUtils.cleanPath(file.getOriginalFilename());
				client.blobName(fileName).buildClient().upload(file.getInputStream(), file.getSize(), true);
				return ResponseEntity.ok("Successfully saved");
			} catch (Exception e) {

			}
		}
		return null;
	}

	public byte[] getImageWithMediaType(String imageName) throws IOException {
		try {
			File temp = new File(imageName);
			client.blobName(imageName).buildClient().downloadToFile(temp.getPath());
			byte[] content = Files.readAllBytes(Paths.get(temp.getPath()));
			temp.delete();
			return content;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}
}
