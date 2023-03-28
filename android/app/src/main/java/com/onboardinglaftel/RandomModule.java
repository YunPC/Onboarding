package com.onboardinglaftel;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import java.util.Random;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableNativeArray;

public class RandomModule extends ReactContextBaseJavaModule {
   RandomModule(ReactApplicationContext context) {
       super(context);
   }

   @Override
   public String getName(){
    return "RandomModule";
   }

   @ReactMethod
   public void getRandomColor(Promise promise){
    try {
      WritableArray writableArray = new WritableNativeArray();
      Random rd = new Random();
      for(int i = 0; i < 3; i++){
        writableArray.pushInt((Integer) rd.nextInt(255));
      }

      promise.resolve(writableArray);
    } catch(Exception e){
      promise.reject("Error", e);
    }
   }
}