package com.paytrack.app;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.graphics.Color;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 1. ACCESS WEBVIEW SETTINGS
        WebView webView = (WebView) this.bridge.getWebView();
        if (webView != null) {
            WebSettings settings = webView.getSettings();

            // FIXES EXTRA ZOOM: Forces 100% text and display scale
            settings.setTextZoom(100);
            settings.setSupportZoom(false);
            settings.setBuiltInZoomControls(false);
            settings.setDisplayZoomControls(false); // Extra safety to hide zoom UI

            // Ensure full-width viewport mapping
            settings.setLoadWithOverviewMode(true);
            settings.setUseWideViewPort(true);
        }

        // 2. EDGE-TO-EDGE FIX (Removes the top/bottom bars)
        Window window = getWindow();

        // Tells Android to let the app draw its own background in the bar areas
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);

        // Set colors to Transparent
        window.setStatusBarColor(Color.TRANSPARENT);
        window.setNavigationBarColor(Color.TRANSPARENT);

        // UI Flags to hide the system gaps and allow content to flow to the absolute edges
        window.getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
                        View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                        View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        );
        // This line makes the status bar icons (Clock/Battery) WHITE
        window.getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
                        View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                        View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                // Do NOT add SYSTEM_UI_FLAG_LIGHT_STATUS_BAR here if you want white icons
        );
    }
}