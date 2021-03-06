package com.trendingthingsui;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.dylanvann.fastimage.FastImageViewPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.wix.autogrowtextinput.AutoGrowTextInputPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.imagepicker.ImagePickerPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new FastImageViewPackage(),
            new ImageResizerPackage(),
            new SplashScreenReactPackage(),
            new FBSDKPackage(),
            new PickerPackage(),
            new AutoGrowTextInputPackage(),
            new MapsPackage(),
            new RNGeocoderPackage(),
            new ImagePickerPackage(),
            new BlurViewPackage(),
            new RCTCameraPackage(),
            new VectorIconsPackage(),
            new RNSpinkitPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
