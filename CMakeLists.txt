cmake_minimum_required(VERSION 3.10)
project(OaStatWeb3 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

cmake_policy(SET CMP0167 OLD)
find_package(Boost REQUIRED)

add_executable(OaStatWeb3
    src/main.cpp
    src/OaStatWeb3.cpp
    src/OutputterBasic.cpp
    src/OutputterCtemplate.cpp
    src/OpenArenaConverters.cpp
)

target_include_directories(OaStatWeb3 PRIVATE ${Boost_INCLUDE_DIRS})
target_link_libraries(OaStatWeb3 PRIVATE cppdb cppcms ctemplate)
