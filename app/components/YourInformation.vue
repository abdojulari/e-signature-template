<template>
  <div class="bg-stone-200/20 backdrop-blur-md rounded-2xl border border-gray-200 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
    <!-- Subtle glass shine effect -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
    
    <!-- Step Progress Indicator -->
    <div class="mb-6 sm:mb-8">
      <div class="flex items-center justify-center sm:justify-between mb-4 sm:mb-6 overflow-x-auto">
        <div v-for="(step, index) in steps" :key="index" class="flex items-center flex-shrink-0">
          <div :class="[
            'w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300',
            currentStep >= index + 1 
              ? 'bg-gradient-to-r from-slate-600/80 to-gray-700/80 text-white border-2 border-white/30' 
              : 'bg-white/10 text-gray-400 border-2 border-white/20'
          ]">
            {{ index + 1 }}
          </div>
          <div v-if="index < steps.length - 1" :class="[
            'w-8 sm:w-16 h-1 mx-2 sm:mx-3 transition-all duration-300',
            currentStep > index + 1 ? 'bg-gradient-to-r from-slate-600/80 to-gray-700/80' : 'bg-white/20'
          ]"></div>
        </div>
      </div>
      
      <div class="text-center">
        <h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-600 dark:text-white mb-2 tracking-wide">
          {{ steps[currentStep - 1]?.title || 'Step' }}
        </h2>
        <p class="text-xs sm:text-sm text-gray-500 px-2">
          {{ steps[currentStep - 1]?.description || 'Please complete this step' }}
        </p>
      </div>
    </div>
    
    <!-- Step Content -->
    <div class="min-h-[400px]">
      <!-- Step 1: Basic Information -->
      <div v-if="currentStep === 1" class="space-y-6">
        <!-- Profile Photo -->
        <div class="bg-white/5 rounded-xl border border-white/20 p-4 sm:p-6">
          <h3 class="text-base sm:text-lg font-semibold text-gray-600 dark:text-white mb-4 flex items-center">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Profile Photo
          </h3>
          
          <div class="grid grid-cols-1 gap-4 sm:gap-6">
            <div>
              <!-- URL Input -->
              <div class="mb-3">
                <input 
                  type="url" 
                  :value="signatureData.profilePhotoUrl"
                  @input="handleProfilePhotoUrlInput"
                  placeholder="https://imgur.com/your-image.jpg (Recommended for all email clients)"
                  :class="getInputClasses('profilePhotoUrl')"
                >
              </div>
              
              <!-- File Upload -->
              <div class="relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  @change="handleProfilePhoto"
                  class="w-full px-2 py-2 sm:px-3 sm:py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-gray-300/50 bg-white/10 text-gray-600 text-xs sm:text-sm file:mr-2 sm:file:mr-3 file:py-1 file:px-2 sm:file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-white/20 file:text-gray-600 hover:file:bg-white/30 transition-all duration-150 backdrop-blur-sm"
                >
               
              </div>
            </div>
            
            <!-- Preview -->
            <div class="flex justify-center items-center mt-4 sm:mt-0">
              <div v-if="profilePhotoLoading" class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center">
                <svg class="w-4 h-4 sm:w-6 sm:h-6 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <img v-else-if="getProfileImageSrc()" :src="getProfileImageSrc()" alt="Profile Preview" class="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white/30 shadow-sm">
              <div v-else class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-white/30 bg-white/5 flex items-center justify-center">
                <svg class="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Names -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label class="block text-xs sm:text-sm font-semibold text-gray-600 dark:text-white mb-2 tracking-wide">
              First Name *
            </label>
            <input 
              :value="signatureData.firstName"
              @input="updateField('firstName', $event)"
              @blur="updateField('firstName', $event)"
              type="text" 
              :class="getInputClasses('firstName')"
              placeholder="John"
            >
            <p v-if="validationErrors.firstName" class="mt-1 text-sm text-red-600">
              {{ validationErrors.firstName }}
            </p>
          </div>
          
          <div>
            <label class="block text-xs sm:text-sm font-semibold text-gray-600 dark:text-white mb-2 tracking-wide">
              Middle Name
            </label>
            <input 
              :value="signatureData.middleName"
              @input="updateField('middleName', $event)"
              @blur="updateField('middleName', $event)"
              type="text" 
              :class="getInputClasses('middleName')"
              placeholder="Michael"
            >
            <p v-if="validationErrors.middleName" class="mt-1 text-sm text-red-600">
              {{ validationErrors.middleName }}
            </p>
          </div>
          
          <div>
            <label class="block text-xs sm:text-sm font-semibold text-gray-600 dark:text-white mb-2 tracking-wide">
              Last Name *
            </label>
            <input 
              :value="signatureData.lastName"
              @input="updateField('lastName', $event)"
              @blur="updateField('lastName', $event)"
              type="text" 
              :class="getInputClasses('lastName')"
              placeholder="Doe"
            >
            <p v-if="validationErrors.lastName" class="mt-1 text-sm text-red-600">
              {{ validationErrors.lastName }}
            </p>
          </div>
        </div>
        
        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold text-gray-600 dark:text-white mb-2 tracking-wide">
            Email Address *
          </label>
          <input 
            :value="signatureData.email"
            @input="updateField('email', $event)"
            @blur="updateField('email', $event)"
            type="email" 
            :class="getInputClasses('email')"
            placeholder="john@example.com"
          >
          <p v-if="validationErrors.email" class="mt-1 text-sm text-red-600">
            {{ validationErrors.email }}
          </p>
        </div>
        
        <!-- Phone Numbers -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-600 dark:text-white mb-2 tracking-wide">
              Mobile Phone
            </label>
            <input 
              :value="signatureData.mobilePhone"
              @input="updateField('mobilePhone', $event)"
              @blur="updateField('mobilePhone', $event)"
              type="tel" 
              :class="getInputClasses('mobilePhone')"
              placeholder="+1 (555) 123-4567"
            >
            <p v-if="validationErrors.mobilePhone" class="mt-1 text-sm text-red-600">
              {{ validationErrors.mobilePhone }}
            </p>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-600 dark:text-white mb-2 tracking-wide">
              Office Phone
            </label>
            <input 
              :value="signatureData.officePhone"
              @input="updateField('officePhone', $event)"
              @blur="updateField('officePhone', $event)"
              type="tel" 
              :class="getInputClasses('officePhone')"
              placeholder="+1 (555) 456-7890"
            >
            <p v-if="validationErrors.officePhone" class="mt-1 text-sm text-red-600">
              {{ validationErrors.officePhone }}
            </p>
          </div>
        </div>
        
        <!-- Website -->
        <div>
          <label class="block text-sm font-semibold text-gray-600 dark:text-white mb-2 tracking-wide">
            Website
          </label>
          <input 
            :value="signatureData.website"
            @input="updateField('website', $event)"
            @blur="updateField('website', $event)"
            type="url" 
            :class="getInputClasses('website')"
            placeholder="https://example.com"
          >
          <p v-if="validationErrors.website" class="mt-1 text-sm text-red-600">
            {{ validationErrors.website }}
          </p>
        </div>
      </div>
      
      <!-- Step 2: Company Information -->
      <div v-if="currentStep === 2" class="space-y-6">
        <!-- Company Logo -->
        <div class="bg-white/5 rounded-xl border border-white/20 p-4">
          <h3 class="text-lg font-semibold text-gray-600 dark:text-white mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            Company Logo
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div >
              <!-- URL Input -->
              <div class="mb-3">
                <input 
                  type="url" 
                  :value="signatureData.companyLogoUrl"
                  @input="handleCompanyLogoUrlInput"
                  placeholder="https://imgur.com/your-logo.png (Recommended for all email clients)"
                  :class="getInputClasses('companyLogoUrl')"
                >
    
              </div>
              
              <!-- File Upload -->
              <div class="relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  @change="handleCompanyLogo"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-gray-300/50 bg-white/10 text-gray-600 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-white/20 file:text-gray-600 hover:file:bg-white/30 transition-all duration-150 backdrop-blur-sm"
                >
                
              </div>
            </div>
            
            <!-- Preview -->
            <div class="flex justify-center items-center">
              <div v-if="companyLogoLoading" class="h-16 w-24 border border-white/30 rounded-lg bg-white/10 flex items-center justify-center">
                <svg class="w-6 h-6 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <img v-else-if="getCompanyLogoSrc()" :src="getCompanyLogoSrc()" alt="Logo Preview" class="h-16 object-contain border border-white/30 rounded-lg p-2 bg-white/10 shadow-sm">
              <div v-else class="h-16 w-24 border-2 border-dashed border-white/30 bg-white/5 flex items-center justify-center rounded-lg">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Company Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-600 dark:text-white mb-2 tracking-wide">Job Title</label>
            <input 
              :value="signatureData.jobTitle"
              @input="updateField('jobTitle', $event)"
              type="text" 
              :class="getInputClasses('jobTitle')"
              placeholder="Marketing Director"
            >
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-600 dark:text-white mb-2 tracking-wide">Company Name</label>
            <input 
              :value="signatureData.companyName"
              @input="updateField('companyName', $event)"
              type="text" 
              :class="getInputClasses('companyName')"
              placeholder="Acme Inc."
            >
          </div>
        </div>
        
        <!-- Company Address Section -->
        <div class="bg-white/5 rounded-xl border border-white/20 p-4">
          <h3 class="text-lg font-semibold text-gray-600 dark:text-white mb-4 tracking-wide flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Company Address (Optional)
          </h3>
          <p class="text-sm text-gray-600/70 mb-4 dark:text-gray-200">Add your company's physical address to include in signatures</p>
          
          <div class="space-y-4">
            <!-- Street Address -->
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-white mb-2">Street Address</label>
              <input 
                :value="signatureData.companyAddress"
                @input="updateField('companyAddress', $event)"
                type="text" 
                :class="getInputClasses('companyAddress')"
                placeholder="123 Business Street"
              >
            </div>
            
            <!-- City, State, Zip -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-600 dark:text-white mb-2">City</label>
                <input 
                  :value="signatureData.companyCity"
                  @input="updateField('companyCity', $event)"
                  type="text" 
                  :class="getInputClasses('companyCity')"
                  placeholder="New York"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-600 dark:text-white mb-2">State/Province</label>
                <input 
                  :value="signatureData.companyState"
                  @input="updateField('companyState', $event)"
                  type="text" 
                  :class="getInputClasses('companyState')"
                  placeholder="NY"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-600 dark:text-white mb-2">ZIP/Postal Code</label>
                <input 
                  :value="signatureData.companyZipCode"
                  @input="updateField('companyZipCode', $event)"
                  type="text" 
                  :class="getInputClasses('companyZipCode')"
                  placeholder="10001"
                >
              </div>
            </div>
            
            <!-- Country -->
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-white mb-2">Country</label>
              <input 
                :value="signatureData.companyCountry"
                @input="updateField('companyCountry', $event)"
                type="text" 
                :class="getInputClasses('companyCountry')"
                placeholder="United States"
              >
            </div>
          </div>
        </div>
      </div>
      
      <!-- Step 3: Social Media -->
      <div v-if="currentStep === 3" class="space-y-6">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <label class="flex items-center justify-between cursor-pointer group">
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
              </svg>
              <div>
                <span class="text-lg font-semibold text-gray-600 dark:text-white tracking-wide">Include Social Media</span>
                <p class="text-sm text-gray-600/70 mt-1">Add your social media profiles to your signature</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <span v-if="selectedSocialNetworks.length > 0" class="text-sm text-gray-600 bg-white/20 px-3 py-1 rounded-full">
                {{ selectedSocialNetworks.length }} selected
              </span>
              <input 
                type="checkbox" 
                :checked="includeSocialMedia"
                @change="toggleSocialMediaInclusion"
                class="w-6 h-6 text-gray-600 bg-white/20 border-white/30 rounded focus:ring-gray-500/50 focus:ring-2 backdrop-blur-sm"
              >
            </div>
          </label>
          
          <!-- Social Media Configuration Button -->
          <div v-if="includeSocialMedia" class="mt-6 pt-6 border-t border-white/20">
            <button 
              @click="openSocialMediaDialog"
              class="w-full px-6 py-4 border border-white/30 text-gray-600 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-150 text-base font-medium shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Configure Social Media
              <span v-if="selectedSocialNetworks.length > 0" class="ml-3 text-sm bg-gray-600 text-white px-3 py-1 rounded-full">
                {{ selectedSocialNetworks.length }}
              </span>
            </button>
          </div>
          
          <!-- Social Media Preview -->
          <div v-if="includeSocialMedia && selectedSocialNetworks.length > 0" class="mt-6 pt-6 border-t border-white/20">
            <h4 class="text-sm font-medium text-gray-600 dark:text-white mb-3">Selected Social Networks:</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="network in selectedSocialNetworks" :key="network" class="px-3 py-1 bg-white/20 text-gray-600 rounded-full text-sm capitalize">
                {{ network }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Step 4: QR Code -->
      <div v-if="currentStep === 4" class="space-y-6">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <label class="flex items-center justify-between cursor-pointer group">
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V4a1 1 0 00-1-1H5a1 1 0 00-1 1v3a1 1 0 001 1zm0 10h2a1 1 0 001-1v-3a1 1 0 00-1-1H5a1 1 0 00-1 1v3a1 1 0 001 1zM17 8h2a1 1 0 001-1V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v3a1 1 0 001 1z"></path>
              </svg>
              <div>
                <span class="text-lg font-semibold text-gray-600 dark:text-white tracking-wide">Include QR Code</span>
                <p class="text-sm text-gray-600/70 mt-1 dark:text-gray-200">Add a scannable QR code with your contact information</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <span v-if="signatureData.includeQRCode" class="text-sm text-gray-600 bg-white/20 px-3 py-1 rounded-full">
                Active
              </span>
              <input 
                type="checkbox" 
                :checked="signatureData.includeQRCode"
                @change="toggleQRCodeInclusion"
                class="w-6 h-6 text-gray-600 bg-white/20 border-white/30 rounded focus:ring-gray-500/50 focus:ring-2 backdrop-blur-sm"
              >
            </div>
          </label>
          
          <!-- QR Code Configuration Button -->
          <div v-if="signatureData.includeQRCode" class="mt-6 pt-6 border-t border-white/20">
            <div class="flex items-center space-x-6">
              <button 
                @click="openQRCodeDialog"
                class="flex-1 px-6 py-4 border border-white/30 text-gray-600 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-150 text-base font-medium shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Configure QR Code
              </button>
              
              <!-- QR Code Preview -->
              <div v-if="signatureData.qrCodeData" class="flex-shrink-0">
                <img :src="signatureData.qrCodeData" alt="Contact QR Code" class="w-20 h-20 border border-white/30 rounded-lg shadow-lg">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Navigation Buttons -->
    <div class="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
      <div class="flex gap-3">
        <!-- Previous Button -->
        <button 
          v-if="currentStep > 1"
          @click="previousStep" 
          class="px-6 py-3 border border-white/30 text-gray-600 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-150 text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Previous
        </button>
        
        <!-- Reset Button -->
        <button 
          @click="resetForm" 
          class="px-6 py-3 border border-white/30 text-gray-600 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-150 text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Reset
        </button>
      </div>
      
      <div class="flex gap-3">
        <!-- Next Button -->
        <button 
          v-if="currentStep < steps.length"
          @click="nextStep" 
          :disabled="!canProceedToNextStep"
          :class="[
            'px-6 py-3 rounded-xl transition-all duration-150 text-sm font-medium backdrop-blur-sm shadow-lg hover:shadow-xl flex items-center',
            canProceedToNextStep
              ? 'bg-gradient-to-r from-slate-600/80 to-gray-700/80 text-white hover:from-slate-600 hover:to-gray-700 focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2 hover:scale-105 border border-white/30'
              : 'bg-gray-400/30 text-gray-300 cursor-not-allowed border border-gray-400/30'
          ]"
        >
          Next
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
        
        <!-- Generate Signature Button -->
        <button 
          v-if="currentStep === steps.length"
          @click="generateSignature" 
          :disabled="!isFormValid && Object.keys(validationErrors).length > 0"
          :class="[
            'px-8 py-3 rounded-xl transition-all duration-150 text-sm font-bold backdrop-blur-sm shadow-lg hover:shadow-xl flex items-center',
            isFormValid || Object.keys(validationErrors).length === 0
              ? 'bg-gradient-to-r from-slate-600/80 to-gray-700/80 text-white hover:from-slate-600 hover:to-gray-700 focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2 hover:scale-105 border border-white/30'
              : 'bg-gray-400/30 text-gray-300 cursor-not-allowed border border-gray-400/30'
          ]"
        >
          <span v-if="Object.keys(validationErrors).length > 0" class="mr-2">⚠️</span>
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
          </svg>
          Revalidate
        </button>
      </div>
    </div>
    <p class="flex justify-end mt-5 text-xs text-gray-600/70 dark:text-gray-200">Revalidate chrome extension</p>
    <!-- Validation Summary -->
    <div v-if="Object.keys(validationErrors).length > 0 && currentStep === steps.length" class="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-xl backdrop-blur-sm">
      <h4 class="text-sm font-bold text-red-200 mb-3 flex items-center">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
        Please fix the following errors:
      </h4>
      <ul class="text-sm text-red-100 space-y-1">
        <li v-for="(error, field) in validationErrors" :key="field" class="flex items-start">
          <span class="mr-2 text-red-300">•</span>
          <span>{{ error }}</span>
        </li>
      </ul>
    </div>
    
    <!-- Modal Dialogs -->
    <SocialMediaDialog
      :isOpen="showSocialMediaDialog"
      :selectedSocialNetworks="props.selectedSocialNetworks"
      :socialLinks="props.signatureData.socialLinks"
      @close="closeSocialMediaDialog"
      @save="saveSocialMediaSettings"
    />
    
    <QRCodeDialog
      :isOpen="showQRCodeDialog"
      :includeQRCode="props.signatureData.includeQRCode"
      :qrCodeFields="qrCodeFields"
      :qrCodeSize="qrCodeSize"
      :signatureData="props.signatureData"
      @close="closeQRCodeDialog"
      @save="saveQRCodeSettings"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSignatureGenerator, type SignatureData } from '~/composables/useSignatureGenerator'
import { useValidation, type ValidationResult } from '~/composables/useValidation'
import SocialMediaDialog from '~/components/dialogs/SocialMediaDialog.vue'
import QRCodeDialog from '~/components/dialogs/QRCodeDialog.vue'

interface Props {
  signatureData: SignatureData
  selectedSocialNetworks: string[]
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'update:signatureData': [value: SignatureData]
  'update:selectedSocialNetworks': [value: string[]]
  'resetForm': []
  'generateSignature': []
}>()

// Use composables
const { socialNetworks, generateQRCode } = useSignatureGenerator()
const { 
  validatePhoneNumber, 
  validateEmail, 
  validateWebsite, 
  validateName, 
  validateSocialUrl,
  formatPhoneNumber,
  normalizeWebsiteUrl 
} = useValidation()

// Validation state
const validationErrors = ref<Record<string, string>>({}) 

// Loading states for better UX
const profilePhotoLoading = ref(false)
const companyLogoLoading = ref(false)

// Modal states
const showSocialMediaDialog = ref(false)
const showQRCodeDialog = ref(false)
const includeSocialMedia = ref(props.selectedSocialNetworks.length > 0)

// QR Code settings
const qrCodeFields = ref<string[]>(['firstName', 'lastName', 'email', 'mobilePhone'])
const qrCodeSize = ref(100)

// Multi-step form state
const currentStep = ref(1)
const steps = ref([
  {
    title: 'Basic Information',
    description: 'Enter your personal details and contact information'
  },
  {
    title: 'Company Details',
    description: 'Add your company information and address'
  },
  {
    title: 'Social Media',
    description: 'Configure your social media profiles'
  },
  {
    title: 'QR Code',
    description: 'Set up QR code for easy contact sharing'
  }
])

// Computed validation states
const isFormValid = computed(() => {
  return Object.keys(validationErrors.value).length === 0
})

// Step validation - check if current step can proceed
const canProceedToNextStep = computed(() => {
  switch (currentStep.value) {
    case 1: // Basic Information - require first name, last name, and email
      return props.signatureData.firstName && 
             props.signatureData.lastName && 
             props.signatureData.email &&
             !validationErrors.value.firstName &&
             !validationErrors.value.lastName &&
             !validationErrors.value.email
    case 2: // Company Details - no required fields, can always proceed
      return true
    case 3: // Social Media - no required fields, can always proceed
      return true
    case 4: // QR Code - no required fields, can always proceed
      return true
    default:
      return true
  }
})

// Validation helper functions
const validateField = (field: keyof SignatureData, value: string): ValidationResult => {
  switch (field) {
    case 'firstName':
      return validateName(value, 'First name', true)
    case 'lastName':
      return validateName(value, 'Last name', true)
    case 'middleName':
      return validateName(value, 'Middle name', false)
    case 'email':
      return validateEmail(value)
    case 'mobilePhone':
    case 'officePhone':
      return validatePhoneNumber(value)
    case 'website':
      return validateWebsite(value)
    case 'jobTitle':
    case 'companyName':
    case 'companyAddress':
    case 'companyCity':
    case 'companyState':
    case 'companyZipCode':
    case 'companyCountry':
      return { isValid: true, message: '' } // Optional fields, no validation needed
    default:
      return { isValid: true, message: '' }
  }
}

const updateValidation = (field: keyof SignatureData, validation: ValidationResult) => {
  if (validation.isValid) {
    delete validationErrors.value[field]
  } else {
    validationErrors.value[field] = validation.message
  }
}

// Methods
const updateField = (field: keyof SignatureData, event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value
  
  // Format phone numbers on blur for better UX
  if (['mobilePhone', 'officePhone'].includes(field) && value) {
    value = formatPhoneNumber(value)
  }
  
  // Normalize website URLs
  if (field === 'website' && value) {
    value = normalizeWebsiteUrl(value)
  }
  
  // Validate the field
  const validation = validateField(field, value)
  updateValidation(field, validation)
  
  const updatedData = { ...props.signatureData, [field]: value }
  emit('update:signatureData', updatedData)
}

const updateSocialLink = (network: string, event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  
  // Validate social media URL
  const validation = validateSocialUrl(value, network)
  const fieldKey = `social_${network}`
  updateValidation(fieldKey as keyof SignatureData, validation)
  
  const updatedSocialLinks = { ...props.signatureData.socialLinks, [network]: value }
  const updatedData = { ...props.signatureData, socialLinks: updatedSocialLinks }
  emit('update:signatureData', updatedData)
}

const getSocialNetworkName = (networkId: string) => {
  const network = socialNetworks.find(n => n.id === networkId)
  return network?.name || networkId
}

const getSocialNetworkIcon = (id: string) => {
  const iconMap: Record<string, string> = {
    linkedin: 'fab fa-linkedin-in',
    twitter: 'fab fa-x-twitter',
    facebook: 'fab fa-facebook-f',
    instagram: 'fab fa-instagram',
    youtube: 'fab fa-youtube',
    tiktok: 'fab fa-tiktok',
    whatsapp: 'fab fa-whatsapp',
    telegram: 'fab fa-telegram-plane',
    snapchat: 'fab fa-snapchat-ghost',
    pinterest: 'fab fa-pinterest-p',
    github: 'fab fa-github',
    discord: 'fab fa-discord'
  }
  return iconMap[id] || 'fas fa-link'
}

const getSocialNetworkColor = (id: string) => {
  const colorMap: Record<string, string> = {
    linkedin: '#0077B5',
    twitter: '#000000',
    facebook: '#1877F2',
    instagram: '#E4405F',
    youtube: '#FF0000',
    tiktok: '#000000',
    whatsapp: '#25D366',
    telegram: '#0088CC',
    snapchat: '#FFFC00',
    pinterest: '#BD081C',
    github: '#181717',
    discord: '#5865F2'
  }
  return colorMap[id] || '#6B7280'
}

const getSocialNetworkTextColor = (id: string) => {
  // Use black text for light backgrounds, white for dark
  const lightBackgrounds = ['snapchat']
  return lightBackgrounds.includes(id) ? '#000000' : '#FFFFFF'
}

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file'))
      return
    }
    
    // Validate file size (max 2MB for email compatibility)
    if (file.size > 2 * 1024 * 1024) {
      reject(new Error('Image file must be smaller than 2MB for email compatibility'))
      return
    }
    
    const reader = new FileReader()
    reader.onload = () => {
      // Use requestAnimationFrame to prevent UI blocking
      requestAnimationFrame(() => {
        const result = reader.result as string
        // Ensure we have a valid base64 data URL
        if (result && result.startsWith('data:image/')) {
          resolve(result)
        } else {
          reject(new Error('Failed to convert image to base64'))
        }
      })
    }
    reader.onerror = () => reject(new Error('Failed to read image file'))
    reader.readAsDataURL(file)
  })
}

const handleProfilePhoto = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    profilePhotoLoading.value = true
    try {
      const base64 = await convertFileToBase64(target.files[0])
      const updatedData = {
        ...props.signatureData,
        profilePhoto: target.files[0],
        profilePhotoBase64: base64,
        profilePhotoUrl: '' // Clear URL when file is uploaded
      }
      emit('update:signatureData', updatedData)
      emit('generateSignature')
    } catch (error) {
      console.error('Error converting profile photo:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Error uploading profile photo: ${errorMessage}`)
      // Clear the input
      target.value = ''
    } finally {
      profilePhotoLoading.value = false
    }
  }
}

const handleCompanyLogo = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    companyLogoLoading.value = true
    try {
      const base64 = await convertFileToBase64(target.files[0])
      const updatedData = {
        ...props.signatureData,
        companyLogo: target.files[0],
        companyLogoBase64: base64,
        companyLogoUrl: '' // Clear URL when file is uploaded
      }
      emit('update:signatureData', updatedData)
      emit('generateSignature')
    } catch (error) {
      console.error('Error converting company logo:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Error uploading company logo: ${errorMessage}`)
      // Clear the input
      target.value = ''
    } finally {
      companyLogoLoading.value = false
    }
  }
}

// Handle profile photo URL input
const handleProfilePhotoUrlInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  const updatedData = {
    ...props.signatureData,
    profilePhotoUrl: value,
    profilePhoto: null, // Clear file upload when URL is used
    profilePhotoBase64: ''
  }
  emit('update:signatureData', updatedData)
  emit('generateSignature')
}

// Handle company logo URL input
const handleCompanyLogoUrlInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  const updatedData = {
    ...props.signatureData,
    companyLogoUrl: value,
    companyLogo: null, // Clear file upload when URL is used
    companyLogoBase64: ''
  }
  emit('update:signatureData', updatedData)
  emit('generateSignature')
}

// Get the appropriate image source (URL takes priority over base64)
const getProfileImageSrc = () => {
  return props.signatureData.profilePhotoUrl || props.signatureData.profilePhotoBase64 || undefined
}

const getCompanyLogoSrc = () => {
  return props.signatureData.companyLogoUrl || props.signatureData.companyLogoBase64 || undefined
}

const resetForm = () => {
  emit('resetForm')
}

const generateSignature = () => {
  // Validate all fields before generating signature
  const fieldsToValidate: (keyof SignatureData)[] = [
    'firstName', 'lastName', 'middleName', 'email', 
    'mobilePhone', 'officePhone', 'website'
  ]
  
  fieldsToValidate.forEach(field => {
    const value = props.signatureData[field] as string
    const validation = validateField(field, value)
    updateValidation(field, validation)
  })
  
  // Validate social links
  Object.keys(props.signatureData.socialLinks).forEach(network => {
    const value = props.signatureData.socialLinks[network] || ''
    const validation = validateSocialUrl(value, network)
    const fieldKey = `social_${network}`
    updateValidation(fieldKey as keyof SignatureData, validation)
  })
  
  if (isFormValid.value) {
    emit('generateSignature')
  } else {
    // Show error message or highlight invalid fields
    console.warn('Form has validation errors. Please fix them before generating signature.')
  }
}

// Helper functions for CSS classes
const getInputClasses = (field: keyof SignatureData | string) => {
  const baseClasses = 'w-full px-4 py-3 border rounded-xl focus:outline-none text-sm font-medium transition-all duration-150 backdrop-blur-sm'
  const hasError = validationErrors.value[field]
  
  if (hasError) {
    return `${baseClasses} border-red-300/50 focus:ring-2 focus:ring-red-400/50 focus:border-red-400/50 bg-red-50/20 text-gray-600 placeholder-red-200 hover:shadow-glass-sm`
  } else {
    return `${baseClasses} border-gray-200 focus:ring-2 focus:ring-white/40 focus:border-white/50 bg-white/60 text-gray-600 placeholder-gray-400  hover:bg-white/15 hover:shadow-glass-sm`
  }
}

// Removed validation icons for cleaner professional look

// Modal handlers
const toggleSocialMediaInclusion = () => {
  includeSocialMedia.value = !includeSocialMedia.value
  
  if (!includeSocialMedia.value) {
    // Clear all social networks and links when disabled
    emit('update:selectedSocialNetworks', [])
    const updatedData = { ...props.signatureData, socialLinks: {} }
    emit('update:signatureData', updatedData)
  }
}

const openSocialMediaDialog = () => {
  showSocialMediaDialog.value = true
}

const closeSocialMediaDialog = () => {
  showSocialMediaDialog.value = false
}

const saveSocialMediaSettings = (data: { selectedNetworks: string[], socialLinks: Record<string, string> }) => {
  emit('update:selectedSocialNetworks', data.selectedNetworks)
  const updatedData = { ...props.signatureData, socialLinks: data.socialLinks }
  emit('update:signatureData', updatedData)
  emit('generateSignature')
}

const toggleQRCodeInclusion = () => {
  const newValue = !props.signatureData.includeQRCode
  const updatedData = { ...props.signatureData, includeQRCode: newValue }
  
  if (!newValue) {
    // Clear QR code data when disabled
    updatedData.qrCodeData = ''
  }
  
  emit('update:signatureData', updatedData)
}

const openQRCodeDialog = () => {
  showQRCodeDialog.value = true
}

const closeQRCodeDialog = () => {
  showQRCodeDialog.value = false
}

const saveQRCodeSettings = (data: { includeQRCode: boolean, qrCodeFields: string[], qrCodeSize: number, qrCodeData: string }) => {
  qrCodeFields.value = data.qrCodeFields
  qrCodeSize.value = data.qrCodeSize
  
  const updatedData = {
    ...props.signatureData,
    includeQRCode: data.includeQRCode,
    qrCodeData: data.qrCodeData
  }
  
  emit('update:signatureData', updatedData)
  emit('generateSignature')
}

const toggleQRCode = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const includeQRCode = target.checked
  
  let qrCodeData = ''
  if (includeQRCode) {
    // Generate QR code when enabled
    try {
      qrCodeData = await generateQRCode(props.signatureData)
      console.log('QR Code generated:', qrCodeData ? 'Success' : 'Failed')
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  } else {
    // Clear QR code data when disabled
    qrCodeData = ''
    console.log('QR Code disabled and cleared')
  }
  
  const updatedData = {
    ...props.signatureData,
    includeQRCode,
    qrCodeData
  }
  
  emit('update:signatureData', updatedData)
  // Debounce signature generation for better performance
  setTimeout(() => emit('generateSignature'), 200)
}

// Step navigation methods
const nextStep = () => {
  if (currentStep.value < steps.value.length && canProceedToNextStep.value) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}
</script>
